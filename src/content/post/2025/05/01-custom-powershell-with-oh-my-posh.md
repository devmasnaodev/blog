---
title: "Ambiente de trabalho produtivo com PowerShell"
slug: "custom-powershell-with-on-my-posh"
description: "Terminal e produtividade"
pubDate: "2025-05-03"
author: "Rodrigo Gomes"
tags: ["Powershell", "Terminal", "Windows", "Produtividade"]
heroImage: "/images/2025/05/post-01/cover-custom-powershell-with-on-my-posh.avif"
---

## Contextualização 

Boa parte dos desenvolvedores que utilizam o Windows como sistema operacional de desenvolvimento negligencia as configurações do terminal — algo que pode impulsionar e gerar muito mais produtividade no ambiente de trabalho. Já os desenvolvedores que trabalham em ambientes Unix-like estão acostumados a usar o terminal no dia a dia.

Particularmente, gosto de ter uma experiência de terminal mais próxima possível em ambos os ambientes. Então, vamos lá: é hora de melhorar esse seu terminal sem graça e torná-lo mais produtivo.

Neste artigo, não vou me estender muito, mas vou mostrar o que considero o mínimo necessário para configurar um ambiente de trabalho adequado utilizando o PowerShell.

> Aviso!
Todos os comandos apresentados neste guia foram retirados das documentações oficiais de cada ferramenta. Caso algum comando não funcione ou não gere o resultado esperado, verifique se houve alguma atualização por parte dos fornecedores.

## Instalação do PowerShell

Primeiro passo é fazer a instalação do PowerShell na versão mais recente no seu ambiente Windows, [Instalar o PowerShell usando o WinGet](https://learn.microsoft.com/pt-br/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5#winget)

Pesquisar a versão mais recente do PowerShell
```shell
winget search Microsoft.PowerShell
```

Saída
```shell
Name               Id                           Version Source
---------------------------------------------------------------
PowerShell         Microsoft.PowerShell         7.5.1.0 winget
PowerShell Preview Microsoft.PowerShell.Preview 7.6.0.4 winget
```

Instalar o Powershell ou a versão prévia do PowerShell com o parâmetro ```id```

```shell
winget install --id Microsoft.PowerShell --source winget
```

No painel de configurações do aplicativo Terminal ```Ctrl+,``` em inicialização, selecione PowerShell como perfil padrão.

## Instalação [Oh My Posh](https://ohmyposh.dev/).

Oh My Posh é um mecanismo de prompt personalizado para qualquer shell que tenha a capacidade de ajustar a sequência de prompt com uma função ou variável.

Para realizar a instatação no Windows basta seguir o [guia no site do projeto](https://ohmyposh.dev/docs/installation/windows). Abra o prompt do PowerShell e execute o commando abaixo:

```shell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

Vamos instalar também uma fonte do pacote [Nerd Fonts](https://www.nerdfonts.com/) para dar suporte a ícones no terminal, o próprio Oh My Posh fornece um [utilitário de instalação](https://ohmyposh.dev/docs/installation/fonts).

Execute o comando abaixo para listar as fontes disponíveis para instalação, e selecione a fonte de sua preferência.

```shell
oh-my-posh font install
```

No painel de configurações do aplicativo Terminal ```Ctrl+,``` em Padrão -> Aparência, altere para a fonte recem instalada.

### Configurando o Oh My Posh

> Procedimento abaixo está descrito na [documentação do projeto](https://ohmyposh.dev/docs/installation/prompt).


Para realizar a configuração de temas do **Oh My posh** você pode adicionar o script diretamente no arquivo de perfil do PowerShell, caso o perfil não exista inicie com o comando abaixo.

```shell
notepad $PROFILE
```

> Se o comando acima apresentar erro, certifique-se de criar o perfil primeiro.

```shell
New-Item -Path $PROFILE -Type File -Force
```

Neste cenário, também pode ser que o PowerShell bloqueie a execução de scripts locais. Para resolver isso, configure o PowerShell para exigir que apenas scripts remotos sejam assinados usando ```Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine``` ou [assine o perfil](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_signing?view=powershell-7.3#methods-of-signing-scripts).

Adicione o seguinte snippet como a última linha do seu script de perfil do PowerShell:

```shell
oh-my-posh init pwsh | Invoke-Expression
```

Para adicionar um tema customizado verifique a [listagem de temas disponíveis](https://ohmyposh.dev/docs/themes), e informe o nome do tema, exemplo do comando utilizando variáveis de ambiente 

```shell
oh-my-posh init pwsh --config $env:LOCALAPPDATA'\Programs\oh-my-posh\themes\takuya.omp.json' | Invoke-Expression
```

## Instalação de módulos utilitários para o PowerShell

- [Terminal Icons](https://github.com/devblackops/Terminal-Icons)
- [PSFzf](https://github.com/kelleyma49/PSFzf?tab=readme-ov-file)

### Terminal Icons

Execute o comando abaixo para instalação do Terminal Icons

```shell
Install-Module -Name Terminal-Icons -Repository PSGallery
```

### PS FZF

Para instalação do PSFzf móudlo do PowerShell que encapsula o fzf, é necessário ter o fzf instalado no sistema, execute o comando abaixo para obter via gerenciado de pacotes winget.

```shell
winget install fzf
```

Em seguida instale o módulo PowerShell

```shell
Install-Module -Name PSFzf -Repository PSGallery
```

## Atualizar o perfil do PowerShell

Com os utilitários acima instalados podemos atualizar o arquivo de configuração de perfil do PowerShell, veja o exemplo abaixo:

```shell
#Prompt
oh-my-posh init pwsh --config $env:LOCALAPPDATA'\Programs\oh-my-posh\themes\takuya.omp.json' | Invoke-Expression

#Terminal Icons
Import-Module -Name Terminal-Icons

#PSReadLine
Set-PSReadLineOption -EditMode Emacs
Set-PSReadLineOption -BellStyle None
Set-PSReadLineOption -PredictionSource History

#Fzf
Import-Module PSFzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f' -PSReadlineChordReverseHistory 'Ctrl+r'

# Utilities
function which ($command) {
  Get-Command -Name $command -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty Path -ErrorAction SilentlyContinue
}
```

## Gerenciadores de pacotes adicionais, [Chocolatey](https://community.chocolatey.org/) e [Scoop](https://scoop.sh/)

Falando em gerenciadores de pacotes no Windows, não dá para sobreviver apenas com o ```winget```. Muitos fornecedores disponibilizam seus pacotes por meio do Chocolatey ou do Scoop, que são amplamente utilizados e bem aceitos pela comunidade.

> Sugestão.

Centralize suas instalações em apenas um gerenciador de pacotes — isso facilita a administração e a instalação de recursos no sistema.

Particularmente, gosto da estrutura de pastas do Scoop, mas vale destacar que alguns pacotes podem depender diretamente do Chocolatey, como é o caso do [DDEV](https://ddev.com/).

### Instalação do Chocolatey

Execute o comando abaixo no PowerShell com permissão de administrador.

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Confirme a versão com o comando ```choco --version```.

### Instalação do Scoop

Execute o comando abaixo no PowerShell.

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

Confirme a versão com o comando ```scoop --version```.

## Instalação de ferramentas (Opcional).

Para concluir vou realizar a instalação de algumas ferramentas como Git, Neovim e Curl, com apenas um comando do Scoop é possível instalar as 3 aplicações.

```shell
scoop install git neovim curl
```

> Neovim!

A instalação do neovim sugere a instalação de pacotes adicionais, execute o comando abaixo.

```shell
scoop bucket add extras
scoop install extras/vcredist2022
```

## Configurações para desenvolvedores (Opcional).

Acesse Configurações > Sistema > Para desenvolvedores. Este painel oferece recursos voltados à preparação do sistema para atividades de desenvolvimento, otimizando o terminal e o comportamento do ambiente de execução.

Recomenda-se ativar, ao menos, as seguintes opções:

- **PowerShell – Política de execução:** Altere a política para permitir a execução de scripts locais do PowerShell sem necessidade de assinatura digital.

- **Habilitar sudo:** Ative o suporte ao comando sudo, proporcionando uma experiência mais próxima de ambientes Unix-like.

- **Criar uma Unidade de Desenvolvimento:** Habilite essa funcionalidade para obter melhor desempenho em cenários voltados ao desenvolvimento, com configurações específicas de cache e indexação.

## Considerações finais

A configuração adequada do ambiente de desenvolvimento é um passo estratégico que impacta diretamente na produtividade, estabilidade e escalabilidade das suas soluções. Investir tempo nessa preparação inicial contribui significativamente para um fluxo de trabalho mais eficiente e confiável.

