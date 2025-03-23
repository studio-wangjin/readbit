# Readbit
> Turn complex article into bite-sized learning for daily growth

## Developers
- milooy
- w.hanseul

## Local development
1. Create `.env.local` file:
```sh
$ cp .env.example .env.local
```
Contact @milooy for environment variable values.

2. Run dev server
```sh
$ npm install
$ npm run dev 
```

## Architecture

This project follows Feature-Sliced Design (FSD) architecture. See [/docs/architecture-ko.md](/docs/architecture-ko.md) for details.

We use [Steiger](https://github.com/feature-sliced/steiger) to enforce FSD architecture rules:

```sh
# Check architecture violations
$ npm run lint:fsd

# Fix some violations automatically
$ npm run lint:fsd:fix
```
