---
date: '2011-01-24 00:30:20'
layout: post
slug: my-new-mini-server
status: publish
title: My new mini server
wordpress_id: '619'
categories:
- hacking
- hardware
comments: true
---

For a while now I've wanted a home server of some description, the idea being that it was something I could use to run a web server for development purposes, and a mail server so I could have an offline backup for my Gmail account (considering how much I rely on it, it's only prudent to plan for what might happen if Gmail went down), and whatever else I need. Also, I only have laptops at present so I liked the idea of having something I could leave on all the time and connect to remotely via SSH.

Around Christmas, I read a forum post by someone who'd bought a PogoPlug cheap from PC World and had hacked it into a web server using Plugbox Linux, an Arch-based Linux distro. Shortly afterwards, I went into a branch of Currys in Norwich, and they had one on sale (£20 off the RRP of £70), so I shelled out for it. I already had a load of USB flash drives lying around, and an 8GB one is big enough for what I had in mind. After all, I wasn't going to be serving anything that demanding over it, so something small and low-powered should be fine.

This weekend I finally got round to getting it set up. The PogoPlug service is actually pretty good - if you're unfamiliar with it, it's basically a self-hosted version of Dropbox, where you buy the device, connect it to your router, attach up to 4 flash drives or hard drives via USB, then share the files stored on them easily across your home network or over the Internet. However, this wasn't really what I wanted.

Installing Plugbox Linux wasn't hard - I merely had to activate SSH from the PogoPlug's control panel, connect and kill the hbwd process, then install a new bootloader to enable it to boot the new OS. Once that was done, it was a case of attaching a flash drive, ensuring it was correctly mounted and the filesystem was set up properly, then downloading the Plugbox Linux tarball and unpacking it on the flash drive, before rebooting into the new OS.

Once it was installed, it wasn't too hard to get the hang of pacman. I'd prefer it to have been Debian-based as that's what I'm most familiar with, but that's just personal preference. After a little tinkering I now have Postfix and Dovecot working on there, as well as Apache (although it might make sense to switch to something lighter, such as lighttpd or Cherokee). I've given it a fully qualified domain name via a free subdomain at dyndns.org, and I can now access emails on there via IMAP. Outgoing email works fine too, so I can always set up a Perl script or two to notify me if anything goes wrong by sending an email to my Gmail account. I've set up fetchmail to pull emails from my Gmail account via POP3, so all my email is in the process of being backed up on there, and I can use my phone to access it via IMAP, or SSH in and read it with Mutt. Going forwards, I may install Squirrelmail as well to give me more options.

One thing I'm not too sure about - I couldn't get incoming mails to work, and I'm unsure whether this is because it's using a subdomain (the email address is basically matthew@mydomainname.dyndns.org) or Postfix is merely misconfigured. Is it possible to receive emails to a subdomain in this fashion?

Anyway, this is a really great little machine and it's been lots of fun getting it set up. I have to say, though, I'm really disappointed with the range of home server and NAS products currently on the market. Most of the NAS systems offer very little in the way of functionality or customisability, and most of the home servers are a bit too big, powerful and expensive, and usually run Windows Home Server, which isn't really my cup of tea.

What I'd like to see is a small home server with a couple of hard drive bays at most, and a Debian or Ubuntu-based OS with access to apt-get and tasksel, so it's easy to install whatever you want from the repositories. Also, give it a web interface that's simpler than Webmin and makes it quick and easy to set up common software, but offer an advanced option for those that want it. That would be a fantastic device for end users - if it made it easy to set up a UPnP server, a Firefly server, or a BitTorrent client, that would be really useful.
