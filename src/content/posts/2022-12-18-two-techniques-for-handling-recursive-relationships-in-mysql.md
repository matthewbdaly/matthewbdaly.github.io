---
title: "Two techniques for handling recursive relationships in MySQL"
date: 2022-12-18 14:15:00 +0000
layout: post
categories:
- sql
- mysql
comments: true
---

When modelling users in a hierarchical organization, it's common to need to retrieve the line manager or subordinates of a given user. In MySQL, two of the techniques that can be used to handle these recursive relationships are the `WITH RECURSIVE` common table expression and using closure tables.

### Using CTEs with `WITH RECURSIVE`

A common table expression (CTE) is a temporary result set that is defined within the execution scope of a single SQL statement. In MySQL, you can use the `WITH RECURSIVE` clause to define a CTE that can be used to retrieve all of the users above or below a given user in the hierarchy.

Say we have a `users` table that looks like this:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  manager_id INTEGER REFERENCES users(id)
);
```

To create a CTE that gets the users above a given user, you can use the following query:

```sql
WITH RECURSIVE managers AS (
  SELECT id, name, manager_id
  FROM users
  WHERE id = :user_id
UNION ALL
  SELECT u.id, u.name, u.manager_id
  FROM users u
  INNER JOIN managers m ON m.manager_id = u.id
)
SELECT * FROM managers;
```

This query uses the `WITH RECURSIVE` clause to define a CTE called `managers` that first selects the user with the given `user_id` and then uses the `UNION ALL` operator to combine that user with all of the users above them in the hierarchy. The `INNER JOIN` clause is used to link the `managers` CTE to the users table, so that the `managers` CTE can keep growing until it includes all of the users above the given user in the hierarchy.

To get the users below a given user, you can use a similar query, but with the `manager_id` and `id` fields swapped in the INNER JOIN clause:

```sql
WITH RECURSIVE subordinates AS (
  SELECT id, name, manager_id
  FROM users
  WHERE id = :user_id
UNION ALL
  SELECT u.id, u.name, u.manager_id
  FROM users u
  INNER JOIN subordinates s ON s.id = u.manager_id
)
SELECT * FROM subordinates;
```

This query uses the same technique as the previous example, but it retrieves the users below the given user instead of above.

### Using closure tables

Another technique for handling recursive relationships in MySQL is to use closure tables. A closure table is a special type of table that is used to represent hierarchical data in a relational database. It consists of two tables: one for the entities in the hierarchy (e.g. users) and one for the relationships between those entities.

To create a closure table for a hierarchy of users, you can use the following DDL statement:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE hierarchy (
  ancestor INTEGER NOT NULL REFERENCES users(id),
  descendant INTEGER NOT NULL REFERENCES users(id),
  PRIMARY KEY (ancestor, descendant),
  CHECK (ancestor != descendant)
);
```

The users table is similar to the one in the previous example, but it only contains the `id` and `name` fields. The relationships between the users are defined in the `hierarchy` table.

To insert data into these tables, you would first need to insert rows into the users table for each user in the hierarchy, and then insert rows into the hierarchy table to define the relationships between those users. Here is an example of how this could be done:


```sql
INSERT INTO users (id, name) VALUES
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Carol'),
  (4, 'Dave'),
  (5, 'Eve');

INSERT INTO hierarchy (ancestor, descendant) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (2, 2),
  (2, 3),
  (2, 4),
  (3, 3),
  (4, 4);
```

This inserts five users into the `users` table and then inserts rows into the `hierarchy` table to define the relationships between those users. The ancestor and descendant values are both set to the same id for each user, which indicates that each user is a descendant of themselves. The hierarchy table also defines the relationships between the users, with each user being a descendant of the user above them in the hierarchy.

To get all of the users above a given user using a closure table, you can use the following query:

```sql
SELECT u.*
FROM users u
INNER JOIN hierarchy h ON h.descendant = :user_id
WHERE u.id = h.ancestor
```

This query uses an `INNER JOIN` to link the `users` table to the `hierarchy` table, and then filters the results to only include users that are ancestors of the user with the given `user_id`. This query will return a list of all of the users above the given user in the hierarchy.

To get the users below a given user, you can use a similar query, but with the ancestor and descendant fields swapped in the INNER JOIN clause:

```sql
SELECT u.*
FROM users u
INNER JOIN hierarchy h ON h.ancestor = :user_id
WHERE u.id = h.descendant
```

This query will return a list of all of the users below the given user in the hierarchy.

One downside of the closure table approach is that when the hierarchical structure changes, the `hierarchy` table needs to be updated to reflect the changes. There are a number of approaches you can take to handle this, including:

* Creating MySQL triggers to update the `hierarchy` table automatically when a user is inserted, updated or deleted
* Using events, such as Eloquent model events, to apply the changes in application code
* Truncating and repopulating the `hierarchy` table from scratch

The first approach is generally the most efficient, but has the downside that triggers aren't generally exported from `mysqldump`, making it difficult to manage when importing the production database locally. The last approach often makes the most sense in cases where users are populated from some kind of regular import, in which case the hierarchy will only ever change as a result of that import.

### Which one should I use?

Which of these approaches you should choose in a given situation is highly dependent on the specific needs of your application, since each has advantages and limitations.

Using a closure table results in a smaller, simpler, and generally more efficient query that is easy to express using an ORM or query builder, but requires that you take steps to update the separate closure table when the hierarchy changes. Using the `WITH RECURSIVE` CTE doesn't require a separate table, eliminating the need to populate said table, but for some queries it may not be as efficient. In addition, it can be difficult to express with some ORMs and query builders, necessitating either additional third party packages or falling back to raw queries. If you're stuck using an older version of MySQL, such as on a legacy application, and can't upgrade, you might also not be able to use `WITH RECURSIVE` (though at this point you *really* shouldn't be using a version that old).

At times I've found it necessary to combine both techniques. One application I maintain has a nightly import process for all the users and derives the permissions to view various pieces of content in part from the hierarchy - the only way to determine the hierarchy is by following the line managers back all the way to the managing director for each individual user, but permissions can be assigned to individual business units within the company and cascade down to child business units, and so to know what permissions a user has, we need to know where they sit in the hierarchy. This query would be too cumbersome to perform on the fly for each user, so we use the `WITH RECURSIVE` CTE to detetermine a user's place within the hierarchy, and then populate a closure table from it, as a part of the nightly import.

### Conclusion

In MySQL, there are a number of techniques that can be used to handle recursive relationships in hierarchical data, but two of the most performant and flexible are the `WITH RECURSIVE` CTE and using closure tables. Both techniques have their own benefits and drawbacks, and the best choice will depend on the specific requirements of your application.
