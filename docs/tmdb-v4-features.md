# TMDB API v4 Features Reference

This document outlines the capabilities of the TMDB v4 API, focusing on user authentication and advanced list management.

## 1. Authentication (OAuth 2.0 Flow)
TMDB v4 uses a modern OAuth-style flow that provides a persistent **Access Token**.

- **Request Token**: Create a temporary token and redirect the user for approval.
- **Access Token**: Exchange an approved request token for a permanent user session.
- **Logout**: Revoke an access token.

## 2. User Account Data
Retrieve personalized data associated with the authenticated user.

### Personalized Lists
- **Favorite Movies**: `GET /4/account/{account_id}/movie/favorites`
- **Favorite TV Shows**: `GET /4/account/{account_id}/tv/favorites`
- **Movie Watchlist**: `GET /4/account/{account_id}/movie/watchlist`
- **TV Watchlist**: `GET /4/account/{account_id}/tv/watchlist`
- **Rated Movies**: `GET /4/account/{account_id}/movie/rated`
- **Rated TV Shows**: `GET /4/account/{account_id}/tv/rated`

### Personalized Discovery
- **Personalized Movie Recommendations**: Based on account history.
- **Personalized TV Recommendations**: Based on account history.

## 3. Advanced Custom Lists
v4 introduces powerful multi-media lists with bulk management.

### List Capabilities
- **Mixed Media**: A single list can contain both Movies and TV Shows.
- **Bulk Edit**: Add or remove multiple items in a single request.
- **Item Comments**: Add personal notes or comments to specific items in a list.
- **Privacy Control**: Toggle lists between Public and Private.
- **Sorting/Filtering**: Enhanced server-side sorting for list items.

### List Endpoints
- **Create List**: `POST /4/list`
- **Get List Details**: `GET /4/list/{list_id}`
- **Update List Info**: `PUT /4/list/{list_id}`
- **Add Items**: `POST /4/list/{list_id}/items`
- **Update Items (Notes)**: `PUT /4/list/{list_id}/items`
- **Remove Items**: `DELETE /4/list/{list_id}/items`
- **Clear List**: `GET /4/list/{list_id}/clear`
- **Delete List**: `DELETE /4/list/{list_id}`

## Comparison: v3 vs v4

| Feature | v3 Lists | v4 Lists |
| :--- | :--- | :--- |
| **Media Support** | Movies only | **Movies & TV Shows** |
| **Batch Management** | One-by-one only | **Bulk Add/Remove** |
| **Item Notes** | Not supported | **Supported** |
| **Authentication** | Session ID (Temporary) | **Access Token (Persistent)** |
| **User ID** | Integer Account ID | **String UUID (Account Object ID)** |
