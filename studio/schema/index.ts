import { defineType, defineField } from "sanity";

export const insight = defineType({
  name: "insight", title: "Insight", type: "document",
  fields: [
    defineField({name:"title", title:"Título", type:"string", validation:r=>r.required()}),
    defineField({name:"slug", title:"Slug", type:"slug", options:{source:"title"}, validation:r=>r.required()}),
    defineField({name:"tag", title:"Tema", type:"string", validation:r=>r.required()}),
    defineField({name:"meta", title:"Meta", type:"string"}),
    defineField({name:"excerpt", title:"Resumo", type:"text", rows:3, validation:r=>r.required()}),
    defineField({name:"publishedAt", title:"Publicado em", type:"date", validation:r=>r.required()}),
    defineField({name:"status", title:"Status", type:"string", options:{list:["draft","published"],layout:"radio"}, initialValue:"draft"}),
    defineField({name:"content", title:"Conteúdo", type:"array", of:[{type:"block"}]}),
  ],
});

export const caseStudy = defineType({
  name: "caseStudy", title: "Case", type: "document",
  fields: [
    defineField({name:"client", title:"Cliente", type:"string", validation:r=>r.required()}),
    defineField({name:"title", title:"Título", type:"string", validation:r=>r.required()}),
    defineField({name:"slug", title:"Slug", type:"slug", options:{source:"client"}, validation:r=>r.required()}),
    defineField({name:"category", title:"Categoria", type:"string", validation:r=>r.required()}),
    defineField({name:"summary", title:"Resumo", type:"text", rows:3, validation:r=>r.required()}),
    defineField({name:"status", title:"Status", type:"string", options:{list:["draft","published"],layout:"radio"}, initialValue:"draft"}),
  ],
});

export const schemaTypes = [insight, caseStudy];
