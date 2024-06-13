CREATE TABLE IF NOT EXISTS "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" varchar NOT NULL,
	"brand" varchar NOT NULL,
	"price" real NOT NULL,
	"description" text NOT NULL,
	"rating" real,
	"numReviews" integer,
	"stock" integer NOT NULL,
	"isFeatured" boolean NOT NULL,
	"images" text[] NOT NULL,
	"banner" text NOT NULL,
	"weight" integer NOT NULL,
	"dimensions" json NOT NULL,
	"warranty" varchar NOT NULL,
	"colorOptions" text[] NOT NULL,
	"features" text[] NOT NULL,
	"release_date" timestamp DEFAULT now(),
	CONSTRAINT "product_name_unique" UNIQUE("name"),
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
