---
title: API Reference
description: Complete API documentation with endpoints, parameters, and examples
---

# API Reference

> Base URL: `https://api.example.com/v1` (or describe how to determine)

## Authentication

Describe authentication mechanism (API keys, OAuth, JWT, etc.)

```bash
# Example authentication header
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/v1/endpoint
```

---

## Endpoints

### Resource Name

#### `GET /resources`

List all resources.

**Parameters**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | integer | No | Max items to return (default: 20) |
| `offset` | integer | No | Pagination offset |
| `filter` | string | No | Filter expression |

**Response**

```json
{
  "data": [
    {
      "id": "abc123",
      "name": "Example",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}
```

**Example**

```bash
curl -X GET "https://api.example.com/v1/resources?limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

#### `GET /resources/:id`

Get a single resource by ID.

**Path Parameters**

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Resource ID |

**Response**

```json
{
  "id": "abc123",
  "name": "Example",
  "description": "Detailed description",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Errors**

| Status | Code | Description |
|--------|------|-------------|
| 404 | `not_found` | Resource does not exist |

---

#### `POST /resources`

Create a new resource.

**Request Body**

```json
{
  "name": "New Resource",
  "description": "Optional description"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Resource name (1-100 chars) |
| `description` | string | No | Optional description |

**Response** (201 Created)

```json
{
  "id": "new123",
  "name": "New Resource",
  "description": "Optional description",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Errors**

| Status | Code | Description |
|--------|------|-------------|
| 400 | `validation_error` | Invalid request body |
| 409 | `conflict` | Resource with name already exists |

---

#### `PUT /resources/:id`

Update an existing resource.

**Request Body**

```json
{
  "name": "Updated Name",
  "description": "Updated description"
}
```

**Response** (200 OK)

Returns the updated resource.

---

#### `DELETE /resources/:id`

Delete a resource.

**Response** (204 No Content)

No response body.

**Errors**

| Status | Code | Description |
|--------|------|-------------|
| 404 | `not_found` | Resource does not exist |

---

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | `bad_request` | Malformed request |
| 401 | `unauthorized` | Missing or invalid authentication |
| 403 | `forbidden` | Insufficient permissions |
| 404 | `not_found` | Resource not found |
| 422 | `validation_error` | Request validation failed |
| 429 | `rate_limited` | Too many requests |
| 500 | `internal_error` | Server error |

---

## Rate Limiting

- **Limit**: X requests per minute
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Pagination

List endpoints support cursor-based pagination:

```json
{
  "data": [...],
  "meta": {
    "has_more": true,
    "next_cursor": "abc123"
  }
}
```

Use `?cursor=abc123` on subsequent requests.

---

## Webhooks

If applicable, document webhook events and payloads here.

### Event: `resource.created`

```json
{
  "event": "resource.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "abc123",
    "name": "New Resource"
  }
}
```
