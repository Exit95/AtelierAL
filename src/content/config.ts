import { defineCollection, z } from 'astro:content';

// Artworks Collection
const artworks = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    technique: z.string(),
    size: z.object({
      width: z.number(),
      height: z.number(),
      unit: z.enum(['cm', 'mm']).default('cm')
    }),
    availability: z.enum(['available', 'reserved', 'sold']),
    price: z.string().optional(), // "auf Anfrage" or specific price
    images: z.array(z.string()), // Changed from image() to string for JSON compatibility
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    createdDate: z.coerce.date() // Use coerce to convert string to date
  })
});

// Workshops Collection
const workshops = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(), // Use coerce to convert string to date
    time: z.string(), // e.g., "10:00 - 16:00"
    duration: z.string(), // e.g., "6 Stunden"
    location: z.string(),
    maxParticipants: z.number(),
    currentParticipants: z.number().default(0),
    materials: z.array(z.string()),
    price: z.number(),
    image: z.string(), // Changed from image() to string for JSON compatibility
    bookingEnabled: z.boolean().default(true)
  })
});

// Testimonials Collection
const testimonials = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    author: z.string(),
    role: z.string().optional(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    image: z.string().optional(), // Changed from image() to string for JSON compatibility
    date: z.coerce.date() // Use coerce to convert string to date
  })
});

export const collections = {
  artworks,
  workshops,
  testimonials
};
