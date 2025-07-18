# Pokemon API Agent Instructions

## Build Commands
- **Test**: `bun test` (all tests), `bun test <file>` (single test), `bun test --watch` (watch mode)
- **Lint**: `biome lint ./src` 
- **Format**: `biome format ./src`
- **Coverage**: `bun test --coverage`

## Code Style (Biome Config)
- **Indentation**: 2 spaces, 80 char line width
- **Quotes**: Single quotes, trailing commas, semicolons as needed
- **Imports**: Use `type` imports for types only, organize imports automatically
- **Arrays**: Use shorthand syntax `T[]` instead of `Array<T>`

## Architecture 
- **Domain-driven design**: Domain entities in `src/domain/`, application layer in `src/application/`
- **Error handling**: Use custom `ApplicationStatusError` and `ApplicationConfigurationError` classes
- **Value objects**: Implement validation in static factory methods (e.g., `PokemonId.createRequired()`)
- **Dependencies**: Uses Inversify for DI, pokenode-ts for Pokemon API

## Naming & Types
- **Classes**: PascalCase with descriptive names
- **Interfaces**: PascalCase, use `type` for simple types
- **Constants**: UPPER_SNAKE_CASE for static readonly fields
- **Methods**: camelCase with clear purpose (e.g., `createRequired`, `toNumber`)