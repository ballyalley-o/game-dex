![NBA COVER](https://i.ibb.co/Sy1BpBx/cover.jpg)

# NBA API

This is a simple API that provides information about NBA teams and players. It was built using Typescript-Node.js, Express.js, and MongoDB. Using a microservice written in Python.

<hr>

> # SDKController Documentation

## Class Overview

The `SDKController` class provides methods for interacting with the NBA API.

## Methods

### setPlayerId

```typescript
static setPlayerId(req: Request): void
```

Sets the player ID from the request parameters.

### setTeamId

```typescript
static setTeamId(req: Request): void
```

Sets the team ID from the request parameters.

### setTeamAbbv

```typescript
static setTeamAbbv(req: Request): void
```

Sets the team abbreviation from the request parameters.

### setTeamState

```typescript
static setTeamState(req: Request): void
```

Sets the team state from the request parameters.

### setQueryParams

```typescript
static setQueryParams(req: Request): Record<string, any>
```

Sets the query parameters for the request.

### setQueryParamsFranchise

```typescript
static setQueryParamsFranchise(req: Request): Record<string, any>
```

Sets the franchise query parameters for the request.

## Routes

### getAllTeam

```typescript
public static async getAllTeam(_req: Request, res: Response, _next: NextFunction): Promise<void>
```

Retrieves all teams.

- **Method**: GET
- **Route**: `/sdk/team`
- **Access**: Public

### getTeam

```typescript
public static async getTeam(req: Request, res: Response, _next: NextFunction): Promise<void>
```

Retrieves information about a specific team.

- **Method**: GET
- **Route**: `/sdk/team/:_teamId`
- **Access**: Public

### getTeamByAbbv

```typescript
public static async getTeamByAbbv(req: Request, res: Response, _next: NextFunction): Promise<void>
```

Retrieves information about a specific team by abbreviation.

- **Method**: GET
- **Route**: `/sdk/team/find/:_teamAbbv`
- **Access**: Public

### getAllTeamByState

```typescript
public static async getAllTeamByState(req: Request, res: Response, _next: NextFunction): Promise<void>
```

Retrieves all teams by state.

- **Method**: GET
- **Route**: `/sdk/team/state/:_teamState`
- **Access**: Public

```


```
