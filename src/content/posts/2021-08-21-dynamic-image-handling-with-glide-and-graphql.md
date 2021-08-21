---
title: "Dynamic image handling with Glide and GraphQL"
date: 2021-08-21 16:20:00 +0000
layout: post
categories:
- laravel
- php
- glide
- graphql
comments: true
---

I've used [Glide](https://glide.thephpleague.com/) on several PHP projects in the past. It's a great package that makes it really easy to dynamically generate images on the fly. For instance, if you need a particular image at both a thumbnail size and a full-screen size, it means you have the flexibility to request it at the correct size for any one part of the page. This can potentially save bandwidth since you never have to request a larger image than you technically need and scale it down with HTML attributes or CSS, nor do you have to take steps to generate thumbnails separately before they're needed. Frontend developers can adjust their code to request exactly the version they need at any one time, and can even apply certain effects dynamically.

However, by default it's a bit too open. A malicious user could request an image at an excessive size as part of a denial of service attack. For that reason, it's considered good practice to set a maximum image size, and sign all requests so that you can be sure they're authorized by your application. This works fine if your images are being requested somewhere you can sign them easily, such as in a Blade template. However, doing so in the context of a React or Vue application can potentially be much harder because they're working on the front end and so can't sign requests that are made dynamically in the same way, at least not without you exposing your application's key to the front end, which would be *really* risky. An API endpoint can return URLs for pre-signed specific versions of the image, but that's not as flexible as being able to adjust what you get back via query parameters on the fly.

I'm currently working on an application that uses GraphQL for the API, and for that I wanted to use Glide to enable [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) and minimise the size of the payload. Having recently rewritten this blog in Gatsby, I'd had some exposure to the Sharp plugin, which allows you to query for an image at specific dimensions. It struck me that I could probably do something similar with GraphQL in the context of a Laravel application. Since the GraphQL queries that would return the image URLs and other data were being handled server side, they could in theory accept parameters for the required images, validate that the specified values were acceptable, and return a secure, signed URL for that image for consumption by the front end. Since the frontend was having to make an AJAX request to fetch the items to show anyway, it could request the URLs as part of the same AJAX request as the rest of the items on a page, then render the images along with the rest of the content. Here I'll demonstrate how to do this.

The first thing to do is implement a controller for returning images via Glide. This will differ between frameworks so you'd need to check the Glide documentation, but a typical Laravel version would look something like this:

```php title=app/Http/Controllers/GlideController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Http\Request;
use League\Glide\Filesystem\FileNotFoundException;
use League\Glide\Responses\LaravelResponseFactory;
use League\Glide\ServerFactory;
use League\Glide\Signatures\SignatureException;
use League\Glide\Signatures\SignatureFactory;
use Symfony\Component\HttpFoundation\StreamedResponse;

final class GlideController extends Controller
{
    /**
     * Storage
     *
     * @var Filesystem
     */
    private $filesystem;

    public function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    public function __invoke(Request $request, string $path): StreamedResponse
    {
        try {
            SignatureFactory::create((string)env('APP_KEY'))->validateRequest("/images/" . $path, $request->all());
            $server = ServerFactory::create([
                'response' => new LaravelResponseFactory($request),
                'source' => $this->filesystem->getDriver(),
                'cache' => $this->filesystem->getDriver(),
                'cache_path_prefix' => '.cache',
                'base_url' => '',
                'max_image_size' => 1000 * 1000,
            ]);
            return $server->getImageResponse("images/" . $path, $request->all());
        } catch (SignatureException) {
            abort(403);
        } catch (FileNotFoundException) {
            abort(404);
        }
    }
}
```

Note that I'm using a [single action controller](https://laravel.com/docs/8.x/controllers#single-action-controllers) here. I've found myself gravitating more and more towards these for certain use cases, and [I'm not the only one](https://driesvints.com/blog/the-beauty-of-single-action-controllers/). For me, the biggest benefit of these is probably more concise naming - if a controller does one thing and one thing only, and the class name adequately describes that, you end up naming it something generic, like `call()`. By making the controller a single callable, you don't have to make that decision since it's taken out of your hands (it must be `__invoke()`). I'm also a big fan of callable classes in general - they're essentially closures on steroids since you can still pass dependencies to the constructor.

The `SignatureFactory` line is what handles validating the signature. It's based on the app key, and checks that the path and all its parameters are correctly signed. If the signature isn't valid, it will throw an exception, thus protecting the endpoint from requests that weren't already approved. We also specify a cache location, and a maximum image size to help prevent mass-resize attacks.

You can then register this controller in the usual way:

```php title=routes/web.php
    Route::get('/images/{path}', GlideController::class)->where('path', '.*')->name('glide');
```

If the images aren't going to be accessible to users who aren't logged in, it makes sense to apply whatever authentication middleware you're using to this route as well.

Now, depending on which GraphQL package you're using, defining the schema may be different. In this case, I'm using [Lighthouse](https://lighthouse-php.com/) and the schema definition for an Eloquent model with an image would look something like this:

```graphql title=graphql/schema.graphql
enum ImageFormat {
    jpg
    pjpg
    webp
}

type Image {
    id: ID!
    caption: String!
    dynamicImage(
        width: Int @rules(apply: ["numeric", "max:1000"])
        height: Int @rules(apply: ["numeric", "max:1000"])
        quality: Int @rules(apply: ["numeric", "max:100"])
        format: ImageFormat
    ): String @method
}
```

Here we're specifying what parameters the `dynamicImage()` field accepts, as well as applying some of Laravel's validation rules to the field to ensure it remains within acceptable ranges. We also use an enum to specify the supported image formats. Note that we also use the `@method` directive to tell Lighthouse that this field maps to a method, not a property. If the method name differs from the field name, you would also need to specify that method name, eg `@method(name: "myMethod")`.

Now, assuming your image was stored on the filesystem and the appropriate model field was called `image_path`, the method to retrieve the image URL on the model would look something like this:

```php title=app/Models/Item.php
use Illuminate\Support\Facades\URL;
use League\Glide\Urls\UrlBuilderFactory;

// Define model class...

    public function dynamicImage(int $width = null, int $height = null, int $quality = null, string $format = null): ?string
    {
        $builder = UrlBuilderFactory::create('/images/', (string)env('APP_KEY'));
        return URL::to($builder->getUrl($this->image_path, [
            'w' => $width,
            'h' => $height,
            'q' => $quality,
            'fm' => $format,
        ]));
    }
```

Note that the parameters on the model must be specified in the same order as they are defined in the GraphQL schema for them to be lined up correctly, and must have the same names. I've only added the most obviously useful parameters here, namely height, width, quality and format, but if you need them there's nothing stopping you from adding further parameters - just don't forget to update the GraphQL schema to include them too.

We can then write GraphQL queries to call `dynamicImage()` with whatever parameters we wish to pass through, and will get back an appropriate URL in response. For instance, consider this query:

```graphql
query {
  items {
    data {
      id
      caption
      dynamicImage(width: 400, height:400, quality: 100, format: webp)
    }
  }
}
```

Here we assume a query has been defined called `items` which returns all instances of the `Item` GraphQL type. This would return, for each instance of the `Item` model, the ID, caption and the URL for an image of 100% quality, 400x400 pixels, in WebP format. Please also note that none of these arguments to `dynamicImage()` are required - if you leave one out, Glide will use the default value.

By setting multiple aliases for `dynamicImage()`, we can even fetch multiple versions of the image. In this example, we fetch it at two different sizes, and use a media query to determine which one is shown inside the `<picture>` element:

```graphql
query {
  items {
    data {
      id
      caption
      large_image: dynamicImage(width: 400, height:400, quality: 100, format: webp)
      small_image: dynamicImage(width: 200, height:200, quality: 100, format: webp)
    }
  }
}
```

Then, when rendering a component, you could use the `<picture>` and `<source>` elements to show different versions based on media queries, as in this example of a simple React component used to render individual instances of `Item`:

```typescript title=resources/js/components/Card.tsx
const Card = (item) => (
  <picture>
    <source media="{max-width: 768px}" srcSet={item.small_image} />
    <source media="{min-width: 769px}" srcSet={item.large_image} />
    <img src={item.small_image} alt={item.caption} />
  </picture>
)
```

This enables us to serve responsive images, that are appropriately sized for the current screen resolution. On mobile devices, which may not always have a connection as fast as a desktop or laptop, it also means we aren't wasting bandwidth downloading images which are larger than necessary.

Along similar lines, you could fetch both WebP and JPEG versions of an image:

```graphql {6-7}
query {
  items {
    data {
      id
      caption
      jpeg_image: dynamicImage(width: 400, height: 400, quality: 100, format: jpeg)
      webp_image: dynamicImage(width: 400, height: 400, quality: 100, format: webp)
    }
  }
}
```

Then, we can use the WebP version of the image if the web browser supports it, falling back to JPEG if it doesn't, by using the `<picture>` and `<source>` elements again in our React component:

```typescript title=resources/js/components/Card.tsx {3-4}
const Card = (item) => (
  <picture>
    <source type="image/webp" srcSet={item.webp_image} />
    <img src={item.jpeg_image} alt={item.caption} />
  </picture>
)
```

By doing this we aren't forced to work with the lowest common denominator in terms of image formats. We can instead offer WebP to users whose browsers support it, without locking out users on older browsers.

This technique should be easy enough to apply to other PHP frameworks since Glide is fairly framework agnostic and there are GraphQL implementations for most frameworks. It should also be applicable in other languages - while I'm not aware of a direct equivalent of Glide in Node.js, you could conceivably use [Sharp](https://sharp.pixelplumbing.com/) as the basis of your own custom endpoint to serve up dynamic images based on query parameters, and then serve signed URLs for it via GraphQL.
