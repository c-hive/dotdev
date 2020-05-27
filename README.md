# dotdev

#### Next.js SPA professional website template for teams and individuals: https://c-hive.github.io/dotdev/

Status and support

- &#x2714; stable
- &#x2714; supported
- &#x2716; no ongoing development

[![CI](/../../workflows/CI/badge.svg?branch=master)](/../../actions)

## Usage

#### Configuration

Refer to the [example](./config/config.example.yml) file for the available options. Store them in the `CONFIG` environment variable.

#### Deploy to GitHub Pages
- [Fork me](/../../fork)
- Store a [deployment key](https://github.com/JamesIves/github-pages-deploy-action/tree/dev#using-an-ssh-deploy-key-) in the `DEPLOY_KEY` secret
- Edit `config/config.yml`
- Run `npm run print-config`
- Store the output in the `CONFIG` secret
#### Deploy elsewhere
- [Fork me](/../../fork)
- Set up custom deployment workflow
- Edit `config/config.yml`
- Run `npm run print-config`
- Store the output in the `CONFIG` environment variable

## Local development

```bash
npm install
cp config/config.example.yml config/config.yml
npm run lint
npm run dev
```

## Conventions

This project follows [C-Hive guides](https://github.com/c-hive/guides) for code style, way of working and other development concerns.

## License

The project is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

---

For Issues and PRs older than 2019.11.16 refer to: https://gitlab.com/c-hive/c-hive.dev and https://github.com/c-hive/c-hive.dev/issues/35#issuecomment-555021380
