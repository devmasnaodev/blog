# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Blog DevMasNãoDev**! Este guia descreve como colaborar de forma eficaz com novas postagens e melhorias.

---

## ✍️ Adicionando uma Nova Postagem

1. Crie o arquivo da postagem em: `src/content/blog/YYYY/MM/`
2. O nome do arquivo deve seguir o padrão:

```
{número do post}-{slug}.md
ex: 01-ddev-install-on-wsl-2.md
```

3. Use o seguinte modelo de frontmatter:

```md
---
title: "Ambiente de desenvolvimento simples e rápido com DDEV"
slug: "ddev-install-on-wsl-2"
description: "Instalação do DDEV no WSL 2"
pubDate: "YYYY-MM-DD"
author: "Seu Nome"
tags: ["Tag1", "Tag2"]
heroImage: "/images/YYYY/MM/post-ID/cover-{slug}.avif"
---
```

4. Salve todas as imagens da postagem em: `public/images/YYYY/MM/post-ID/`

- Nome da capa: `cover-{slug}.avif`
- Nome das imagens no corpo: `{ID}-{slug}.avif` (em ordem de exibição)

5. Para converter as imagens para `.avif`, coloque os arquivos `.png` em `/images/YYYY/MM/post-ID/` e execute:

```bash
npm run compress
```

---

## 💬 Commits

Use o seguinte padrão para mensagens de commit ao adicionar postagens:

```bash
content(blog): adicionar postagem "Título da Postagem"
```

---

## 🧪 Checklist antes do Pull Request

- [ ] Nome e localização corretos do arquivo `.md`
- [ ] Frontmatter preenchido corretamente
- [ ] Imagens convertidas para `.avif`
- [ ] Commit com mensagem clara seguindo o padrão

---

## 📫 Dúvidas?

Abra uma [issue](https://github.com/devmasnaodev/blog/issues) ou entre em contato.
