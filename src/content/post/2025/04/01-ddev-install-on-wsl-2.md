---
title: "Ambiente de desenvolvimento simples e rápido com DDEV"
slug: "ddev-install-on-wsl-2"
description: "Instalação do DDEV no WSL 2"
pubDate: "2025-04-06"
author: "Rodrigo Gomes"
tags: ["WSL2", "Docker", "DDEV"]
heroImage: "/images/2025/04/post-01/cover-ddev-install-on-wsl.avif"
---

## O que é o [DDEV](https://ddev.com/)?

O DDEV é uma ferramenta baseada em Docker que simplifica o desenvolvimento de aplicações PHP, especialmente para CMSs como WordPress, Drupal Craft CMS entrou outros. Ele oferece um ambiente padronizado, eliminando problemas de configuração manual e compatibilidade, além de integrar serviços essenciais como banco de dados e cache.

## Porque utilizar o DDEV com WSL2?

No Windows 11, o uso do DDEV com WSL2 proporciona um desempenho superior e uma experiência de desenvolvimento mais fluida, aproveitando os benefícios de um ambiente Linux sem abrir mão da flexibilidade do Windows. Minha motivação em dar esta introdução sobre ambiente de desenvolvimento vem desde já ter batido muita cabeça criando minhas próprias imagens docker e scrips de build, que mesmo me trazendo várias possibilidades de e customizações também custaram um bom tempo para deixar tudo alinhado e organizado.

## Pré requisitos

- [WSL2](https://learn.microsoft.com/pt-br/windows/wsl/install) (Windows Subsystem for Linux).
- [Docker Desktop](https://www.docker.com/products/docker-desktop/), ou [Docker CE](https://docs.docker.com/engine/install/ubuntu/).

## Bora para instalação

Optei por realizar a instalação com Docker Desktop pois em diversos teste que já apliquei funcionou perfeitamente e além disso, sua interface gráfica facilita a visualização dos recursos e a administração dos containers de forma intuitiva.

No guia de instalação o processo se resume básicamente em executar um [script de instalação](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#wsl2-docker-desktop-install-script) automatizada, e iremos seguir este procedimentos, mas para os entusiatas que gostam de compreender o processo passo a passo o que o script faz é praticamente realizar os procedimentos da instalação manual [descritos nesta seção](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/#wsl2docker-desktop-manual-installation).

Por padrão o DDEV busca por uma distribuição Ubuntu instalada no seu WSL2 e ao executar o script automático ele irá utilizar a distribuição padrão, então caso tenha mais de uma distribuição, _e eu recomendo que tenha_ você pode definir ela como padrão, utilizando por exemplo o comando abaixo:

```shell
wsl --set-default Ubuntu-24.04
```

No Docker Desktop confirme a integração com WSL2 em Docker Desktop → Settings → Resources → WSL2 Integration

![Configuração Docker Desktop](/images/2025/04/post-01/01-ddev-install-on-wsl.avif)

No PowerShell como administrador [execute este script](https://github.com/ddev/ddev/blob/main/scripts/install_ddev_wsl2_docker_desktop.ps1) com o comando abaixo:

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/ddev/ddev/main/scripts/install_ddev_wsl2_docker_desktop.ps1'))
```

A instalação irá configurar automaticamente alguns pacotes indispensáveis para o funcionamento adequado do DDEV, incluindo:

- [Chocolatey](https://chocolatey.org/install)
- [gsudo](https://github.com/gerardog/gsudo)
- [mkcert](https://github.com/FiloSottile/mkcert)
- [ngrok](https://ngrok.com/)

Durante o procedimento de instalação é importante confirmar a instalação o certificado configurado pelo **mkcert**:

![Certificado mkcert](/images/2025/04/post-01/02-ddev-install-on-wsl.avif)

Se tudo ocorrer conforme o esperado, ao final do processo você verá um resumo com os detalhes da instalação concluída com sucesso:

![Instalação DDEV concluída](/images/2025/04/post-01/03-ddev-install-on-wsl.avif)

Com a instalação finalizada, você já pode acessar a instância WSL definida no início do processo e validar a versão instalada do DDEV:

![Versão disponível no WSL](/images/2025/04/post-01/04-ddev-install-on-wsl.avif)

## Instalando o WordPress no ambiente de desenvolvimento.

Para finalizar, vamos executar um teste prático criando um projeto com DDEV. A documentação oficial disponibiliza os [CMS Quickstarts](https://ddev.readthedocs.io/en/stable/users/quickstart/), um excelente ponto de partida para configurar os principais CMSs e frameworks PHP do mercado. Entre as opções disponíveis, podemos destacar:

- CraftCMS
- Drupal
- Laravel
- WordPress

Esses guias aceleram significativamente o processo de inicialização de projetos reais com DDEV.

> Você pode optar por utilizar o seu ambiente Windows para gestão do seus projetos ou executar os comandos abaixos em sua instância WSL configurada para o DDEV.

** partircularmente eu configuro tudo no WSL2 **

Neste caso vou seguir o passo a passo para instalar o WordPress padrão via WP-CLI,

```shell
# Crie uma pasta para o projeto
mkdir wp-site && cd wp-site

# Crie um novo projeto DDEV dentro da pasta recém-criada
# (URL principal definido automaticamente como `https://<pasta>.ddev.site`)
ddev config --project-type=wordpress
ddev start
```

Este primeiro **start** pode leva um certo tempo pois irá baixar diversas imagens para os containers do DDEV.

![Imagens docker do DDEV](/images/2025/04/post-01/05-ddev-install-on-wsl.avif)

Assim que tudo for concluído você seguirá com a instalação do WordPress.

```shell
# Download WordPress
ddev wp core download --locale=pt_BR

# Use o seguinte comando de instalação
# (precisamos usar aspas simples para obter a URL do site principal de `.ddev/config.yaml` como variável)
ddev wp core install --url='$DDEV_PRIMARY_URL' --title='WordPress site' --admin_user=admin --admin_password=admin --admin_email=admin@example.com

# Abra o painel de administração do WordPress no seu navegador
ddev launch wp-admin/
```

Pronto agora você já pode acessar a instalação do WordPress e conferir também no Docker Desktop que os containers do projeto já estão rodando.

![Imagens docker do DDEV](/images/2025/04/post-01/06-ddev-install-on-wsl.avif)

Por padrão o DDEV inclui

- **Container WEB** com serviços do Nginx e [Mailpit](https://github.com/axllent/mailpit) configurados
- **Container DB** para o banco de dados
- **Container SSH Agent** serve para facilitar o uso de chaves SSH da máquina host dentro dos containers, de maneira segura e reutilizável, especialmente útil para ambientes de desenvolvimento que interagem com serviços privados
- **Container Traefik** para realizar o roteamento de todos projetos em execução.

## Considerações Finais

Com o DDEV operando dentro do WSL2, você passa a contar com uma solução poderosa, padronizada e altamente produtiva para o desenvolvimento de aplicações PHP no Windows. Esta abordagem elimina grande parte das frustrações com configurações inconsistentes, enquanto mantém a flexibilidade necessária para projetos modernos e escaláveis.

Além de simplificar a gestão de ambientes locais, o DDEV permite foco total no desenvolvimento da aplicação, integrando serviços essenciais, otimizando a colaboração em equipe e acelerando a entrega de valor.

🚀 Em um cenário onde tempo é um dos ativos mais valiosos, ter um setup como esse é mais que uma vantagem — é uma estratégia.

Caso você tenha dúvidas ou deseje trocar experiências sobre o uso do DDEV, sinta-se à vontade para comentar ou entrar em contato.

Até a próxima!
