// studio/schemaTypes/product.ts

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa Produktu',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (link)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Zdjęcia Produktu',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
        name: 'shortDescription',
        title: 'Krótki opis (do listy produktów)',
        type: 'string',
        validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: 'body',
      title: 'Pełny opis (na stronie produktu)',
      type: 'blockContent',
      validation: Rule => Rule.required(),
    }),
    // ZMIANA: Dodano pole na plik cyfrowy
    defineField({
      name: 'digitalFile',
      title: 'Plik cyfrowy do wysyłki',
      description: 'Wgraj tutaj plik (np. PDF), który klient otrzyma po zakupie.',
      type: 'file',
    }),
    defineField({
      name: 'price',
      title: 'Cena (w groszach)',
      description: 'Podaj cenę w groszach, np. 14900 dla 149,00 zł',
      type: 'number',
      validation: Rule => Rule.required().integer().positive(),
    }),
    defineField({
        name: 'originalPrice',
        title: 'Stara cena (opcjonalnie, w groszach)',
        description: 'Wypełnij tylko, jeśli produkt jest w promocji.',
        type: 'number',
    }),
    defineField({
        name: 'bestseller',
        title: 'Oznacz jako Bestseller',
        type: 'boolean',
        initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
    },
  },
})