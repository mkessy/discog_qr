import type * as HttpClient from "@effect/platform/HttpClient"
import * as HttpClientError from "@effect/platform/HttpClientError"
import * as HttpClientRequest from "@effect/platform/HttpClientRequest"
import * as HttpClientResponse from "@effect/platform/HttpClientResponse"
import type * as UrlParams from "@effect/platform/UrlParams"
import * as Effect from "effect/Effect"
import type { ParseError } from "effect/ParseResult"
import * as S from "effect/Schema"

export class UserProfile extends S.Class<UserProfile>("UserProfile")({
  "username": S.String,
  "id": S.Int,
  "name": S.optionalWith(S.String, { nullable: true }),
  "profile": S.optionalWith(S.String, { nullable: true }),
  "home_page": S.optionalWith(S.String, { nullable: true }),
  "location": S.optionalWith(S.String, { nullable: true }),
  "registered": S.optionalWith(S.String, { nullable: true }),
  "rank": S.optionalWith(S.Int, { nullable: true }),
  "num_collection": S.optionalWith(S.Int, { nullable: true }),
  "num_wantlist": S.optionalWith(S.Int, { nullable: true }),
  "num_list": S.optionalWith(S.Int, { nullable: true }),
  "num_for_sale": S.optionalWith(S.Int, { nullable: true }),
  "email": S.optionalWith(S.String, { nullable: true }),
  "inventory_url": S.optionalWith(S.String, { nullable: true }),
  "collection_folders_url": S.optionalWith(S.String, { nullable: true }),
  "wantlist_url": S.optionalWith(S.String, { nullable: true }),
  "uri": S.optionalWith(S.String, { nullable: true }),
  "resource_url": S.String
}) {}

export class EditUserProfileRequest extends S.Class<EditUserProfileRequest>("EditUserProfileRequest")({
  "name": S.optionalWith(S.String, { nullable: true }),
  "home_page": S.optionalWith(S.String, { nullable: true }),
  "location": S.optionalWith(S.String, { nullable: true }),
  "profile": S.optionalWith(S.String, { nullable: true })
}) {}

export class GetUserSubmissionsParams extends S.Struct({
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class Pagination extends S.Struct({
  "page": S.optionalWith(S.Int, { nullable: true }),
  "per_page": S.optionalWith(S.Int, { nullable: true }),
  "pages": S.optionalWith(S.Int, { nullable: true }),
  "items": S.optionalWith(S.Int, { nullable: true }),
  "urls": S.optionalWith(
    S.Struct({
      "last": S.optionalWith(S.String, { nullable: true }),
      "next": S.optionalWith(S.String, { nullable: true }),
      "prev": S.optionalWith(S.String, { nullable: true }),
      "first": S.optionalWith(S.String, { nullable: true })
    }),
    { nullable: true }
  )
}) {}

export class Contribution extends S.Struct({
  "type": S.String,
  "id": S.Int,
  "title": S.String,
  "year": S.optionalWith(S.Int, { nullable: true }),
  "thumb": S.optionalWith(S.String, { nullable: true }),
  "resource_url": S.String
}) {}

export class GetUserSubmissions200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "submissions": S.optionalWith(S.Array(Contribution), { nullable: true })
}) {}

export class GetUserContributionsParams extends S.Struct({
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class GetUserContributions200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "contributions": S.optionalWith(S.Array(Contribution), { nullable: true })
}) {}

export class CollectionFolder extends S.Struct({
  "id": S.Int,
  "name": S.String,
  "count": S.Int,
  "resource_url": S.String
}) {}

export class ListUserCollectionFolders200 extends S.Struct({
  "folders": S.optionalWith(S.Array(CollectionFolder), { nullable: true })
}) {}

export class CreateUserCollectionFolderRequest
  extends S.Class<CreateUserCollectionFolderRequest>("CreateUserCollectionFolderRequest")({
    "name": S.String
  })
{}

export class EditUserCollectionFolderRequest
  extends S.Class<EditUserCollectionFolderRequest>("EditUserCollectionFolderRequest")({
    "name": S.String
  })
{}

export class ListReleasesInUserCollectionFolderParams extends S.Struct({
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class ReleaseSummary extends S.Struct({
  "id": S.Int,
  "title": S.String,
  "year": S.optionalWith(S.Int, { nullable: true }),
  "artists": S.optionalWith(
    S.Array(S.Struct({
      "name": S.optionalWith(S.String, { nullable: true }),
      "id": S.optionalWith(S.Int, { nullable: true }),
      "resource_url": S.optionalWith(S.String, { nullable: true })
    })),
    { nullable: true }
  ),
  "labels": S.optionalWith(
    S.Array(S.Struct({
      "name": S.optionalWith(S.String, { nullable: true }),
      "id": S.optionalWith(S.Int, { nullable: true }),
      "catno": S.optionalWith(S.String, { nullable: true }),
      "resource_url": S.optionalWith(S.String, { nullable: true })
    })),
    { nullable: true }
  ),
  "formats": S.optionalWith(
    S.Array(S.Struct({
      "name": S.optionalWith(S.String, { nullable: true }),
      "qty": S.optionalWith(S.String, { nullable: true }),
      "descriptions": S.optionalWith(S.Array(S.String), { nullable: true })
    })),
    { nullable: true }
  ),
  "thumb": S.optionalWith(S.String, { nullable: true }),
  "cover_image": S.optionalWith(S.String, { nullable: true }),
  "resource_url": S.String
}) {}

export class CollectionItem extends S.Struct({
  "instance_id": S.Int,
  "folder_id": S.optionalWith(S.Int, { nullable: true }),
  "rating": S.optionalWith(S.Int, { nullable: true }),
  "notes": S.optionalWith(S.String, { nullable: true }),
  "media_condition": S.optionalWith(S.String, { nullable: true }),
  "sleeve_condition": S.optionalWith(S.String, { nullable: true }),
  "date_added": S.optionalWith(S.String, { nullable: true }),
  "basic_information": ReleaseSummary,
  "id": S.Int
}) {}

export class ListReleasesInUserCollectionFolder200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "releases": S.optionalWith(S.Array(CollectionItem), { nullable: true })
}) {}

export class AddReleaseToUserCollectionFolderRequest
  extends S.Class<AddReleaseToUserCollectionFolderRequest>("AddReleaseToUserCollectionFolderRequest")({
    "release_id": S.Int,
    "notes": S.optionalWith(S.String, { nullable: true }),
    "media_condition": S.optionalWith(S.String, { nullable: true }),
    "sleeve_condition": S.optionalWith(S.String, { nullable: true }),
    "rating": S.optionalWith(S.Int, { nullable: true }),
    "fields": S.optionalWith(
      S.Array(S.Struct({
        "field_id": S.optionalWith(S.Int, { nullable: true }),
        "value": S.optionalWith(S.String, { nullable: true })
      })),
      { nullable: true }
    )
  })
{}

export class GetUserCollectionItemsByReleaseParams extends S.Struct({
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class GetUserCollectionItemsByRelease200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "releases": S.optionalWith(S.Array(CollectionItem), { nullable: true })
}) {}

export class EditUserCollectionItemInstanceRequest
  extends S.Class<EditUserCollectionItemInstanceRequest>("EditUserCollectionItemInstanceRequest")({
    "notes": S.optionalWith(S.String, { nullable: true }),
    "media_condition": S.optionalWith(S.String, { nullable: true }),
    "sleeve_condition": S.optionalWith(S.String, { nullable: true }),
    "rating": S.optionalWith(S.Int, { nullable: true }),
    "fields": S.optionalWith(
      S.Array(S.Struct({
        "field_id": S.optionalWith(S.Int, { nullable: true }),
        "value": S.optionalWith(S.String, { nullable: true })
      })),
      { nullable: true }
    )
  })
{}

export class CustomField extends S.Struct({
  "id": S.Int,
  "name": S.String
}) {}

export class ListUserCollectionCustomFields200 extends S.Struct({
  "fields": S.optionalWith(S.Array(CustomField), { nullable: true })
}) {}

export class Price extends S.Struct({
  "value": S.Number,
  "currency": S.String
}) {}

export class CollectionValue extends S.Class<CollectionValue>("CollectionValue")({
  "minimum": Price,
  "median": Price,
  "maximum": Price
}) {}

export class ListUserWantlistItemsParams extends S.Struct({
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class WantItem extends S.Struct({
  "id": S.Int,
  "rating": S.optionalWith(S.Int, { nullable: true }),
  "date_added": S.optionalWith(S.String, { nullable: true }),
  "notes": S.optionalWith(S.String, { nullable: true }),
  "basic_information": ReleaseSummary,
  "resource_url": S.String
}) {}

export class ListUserWantlistItems200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "wants": S.optionalWith(S.Array(WantItem), { nullable: true })
}) {}

export class AddReleaseToUserWantlistRequest
  extends S.Class<AddReleaseToUserWantlistRequest>("AddReleaseToUserWantlistRequest")({
    "notes": S.optionalWith(S.String, { nullable: true })
  })
{}

export class ListUserListsParams extends S.Struct({
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class UserListSummary extends S.Struct({
  "id": S.Int,
  "name": S.String,
  "description": S.optionalWith(S.String, { nullable: true }),
  "public": S.optionalWith(S.Boolean, { nullable: true }),
  "item_count": S.optionalWith(S.Int, { nullable: true }),
  "resource_url": S.String
}) {}

export class ListUserLists200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "lists": S.optionalWith(S.Array(UserListSummary), { nullable: true })
}) {}

export class ListUserInventoryItemsParamsStatus extends S.Literal("For Sale", "Draft", "Expired", "Sold", "All") {}

export class ListUserInventoryItemsParamsSort
  extends S.Literal("listed", "price", "item", "artist", "label", "audio", "status", "location")
{}

export class ListUserInventoryItemsParamsSortOrder extends S.Literal("asc", "desc") {}

export class ListUserInventoryItemsParams extends S.Struct({
  "status": S.optionalWith(ListUserInventoryItemsParamsStatus, { nullable: true }),
  "sort": S.optionalWith(ListUserInventoryItemsParamsSort, { nullable: true }),
  "sort_order": S.optionalWith(ListUserInventoryItemsParamsSortOrder, { nullable: true }),
  "page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true }),
  "per_page": S.optionalWith(S.Int.pipe(S.greaterThanOrEqualTo(1)), { nullable: true })
}) {}

export class Listing extends S.Struct({
  "id": S.Int,
  "status": S.String,
  "price": Price,
  "condition": S.optionalWith(S.String, { nullable: true }),
  "sleeve_condition": S.optionalWith(S.String, { nullable: true }),
  "shipping_price": S.optionalWith(Price, { nullable: true }),
  "allow_offers": S.optionalWith(S.Boolean, { nullable: true }),
  "comments": S.optionalWith(S.String, { nullable: true }),
  "private_comments": S.optionalWith(S.String, { nullable: true }),
  "created": S.optionalWith(S.String, { nullable: true }),
  "weight": S.optionalWith(S.Int, { nullable: true }),
  "format_quantity": S.optionalWith(S.Int, { nullable: true }),
  "external_id": S.optionalWith(S.String, { nullable: true }),
  "location": S.optionalWith(S.String, { nullable: true }),
  "release": ReleaseSummary,
  "resource_url": S.String,
  "in_cart": S.optionalWith(S.Boolean, { nullable: true })
}) {}

export class ListUserInventoryItems200 extends S.Struct({
  "pagination": S.optionalWith(Pagination, { nullable: true }),
  "listings": S.optionalWith(S.Array(Listing), { nullable: true })
}) {}

export const make = (
  httpClient: HttpClient.HttpClient,
  options: {
    readonly transformClient?: ((client: HttpClient.HttpClient) => Effect.Effect<HttpClient.HttpClient>) | undefined
  } = {}
): Discog => {
  const unexpectedStatus = (
    request: HttpClientRequest.HttpClientRequest,
    response: HttpClientResponse.HttpClientResponse
  ) =>
    Effect.flatMap(
      Effect.orElseSucceed(response.text, () => "Unexpected status code"),
      (description) =>
        Effect.fail(
          new HttpClientError.ResponseError({
            request,
            response,
            reason: "StatusCode",
            description
          })
        )
    )
  const applyClientTransform = (client: HttpClient.HttpClient): Effect.Effect<HttpClient.HttpClient> =>
    options.transformClient ? options.transformClient(client) : Effect.succeed(client)
  const decodeError = <A, I, R>(response: HttpClientResponse.HttpClientResponse, schema: S.Schema<A, I, R>) =>
    Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)(response), Effect.fail)
  return {
    httpClient,
    "getUserProfile": (username) =>
      HttpClientRequest.make("GET")(`/users/${username}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(UserProfile)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      ),
    "editUserProfile": (username, options) =>
      HttpClientRequest.make("POST")(`/users/${username}`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(UserProfile)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      ),
    "getUserSubmissions": (username, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/submissions`).pipe(
        HttpClientRequest.setUrlParams({
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(GetUserSubmissions200)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      ),
    "getUserContributions": (username, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/contributions`).pipe(
        HttpClientRequest.setUrlParams({
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(GetUserContributions200)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "listUserCollectionFolders": (username) =>
      HttpClientRequest.make("GET")(`/users/${username}/collection/folders`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(ListUserCollectionFolders200)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "createUserCollectionFolder": (username, options) =>
      HttpClientRequest.make("POST")(`/users/${username}/collection/folders`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "201": (r) => HttpClientResponse.schemaBodyJson(CollectionFolder)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "getUserCollectionFolderDetails": (username, folderId) =>
      HttpClientRequest.make("GET")(`/users/${username}/collection/folders/${folderId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(CollectionFolder)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "editUserCollectionFolder": (username, folderId, options) =>
      HttpClientRequest.make("POST")(`/users/${username}/collection/folders/${folderId}`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(CollectionFolder)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "deleteUserCollectionFolder": (username, folderId) =>
      HttpClientRequest.make("DELETE")(`/users/${username}/collection/folders/${folderId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "listReleasesInUserCollectionFolder": (username, folderId, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/collection/folders/${folderId}/releases`).pipe(
        HttpClientRequest.setUrlParams({
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(ListReleasesInUserCollectionFolder200)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "addReleaseToUserCollectionFolder": (username, folderId, options) =>
      HttpClientRequest.make("POST")(`/users/${username}/collection/folders/${folderId}/releases`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "201": (r) => HttpClientResponse.schemaBodyJson(CollectionItem)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "getUserCollectionItemsByRelease": (username, releaseId, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/collection/releases/${releaseId}`).pipe(
        HttpClientRequest.setUrlParams({
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(GetUserCollectionItemsByRelease200)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "editUserCollectionItemInstance": (username, folderId, releaseId, instanceId, options) =>
      HttpClientRequest.make("POST")(
        `/users/${username}/collection/folders/${folderId}/releases/${releaseId}/instances/${instanceId}`
      ).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(CollectionItem)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "deleteUserCollectionItemInstance": (username, folderId, releaseId, instanceId) =>
      HttpClientRequest.make("DELETE")(
        `/users/${username}/collection/folders/${folderId}/releases/${releaseId}/instances/${instanceId}`
      ).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "listUserCollectionCustomFields": (username) =>
      HttpClientRequest.make("GET")(`/users/${username}/collection/fields`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "200": (r) => HttpClientResponse.schemaBodyJson(ListUserCollectionCustomFields200)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "getUserCollectionValue": (username) =>
      HttpClientRequest.make("GET")(`/users/${username}/collection/value`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(CollectionValue)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      ),
    "listUserWantlistItems": (username, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/wants`).pipe(
        HttpClientRequest.setUrlParams({
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(ListUserWantlistItems200)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      ),
    "addReleaseToUserWantlist": (username, releaseId, options) =>
      HttpClientRequest.make("POST")(`/users/${username}/wants/${releaseId}`).pipe(
        (req) => Effect.orDie(HttpClientRequest.bodyJson(req, options)),
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  "201": (r) => HttpClientResponse.schemaBodyJson(WantItem)(r),
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "deleteReleaseFromUserWantlist": (username, releaseId) =>
      HttpClientRequest.make("DELETE")(`/users/${username}/wants/${releaseId}`).pipe(
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(
            applyClientTransform(httpClient),
            (httpClient) =>
              Effect.flatMap(
                httpClient.execute(request),
                HttpClientResponse.matchStatus({
                  orElse: (response) => unexpectedStatus(request, response)
                })
              )
          )
        )
      ),
    "listUserLists": (username, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/lists`).pipe(
        HttpClientRequest.setUrlParams({
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(ListUserLists200)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      ),
    "listUserInventoryItems": (username, options) =>
      HttpClientRequest.make("GET")(`/users/${username}/inventory`).pipe(
        HttpClientRequest.setUrlParams({
          "status": options?.["status"] as UrlParams.Coercible,
          "sort": options?.["sort"] as UrlParams.Coercible,
          "sort_order": options?.["sort_order"] as UrlParams.Coercible,
          "page": options?.["page"] as UrlParams.Coercible,
          "per_page": options?.["per_page"] as UrlParams.Coercible
        }),
        Effect.succeed,
        Effect.flatMap((request) =>
          Effect.flatMap(applyClientTransform(httpClient), (httpClient) =>
            Effect.flatMap(
              httpClient.execute(request),
              HttpClientResponse.matchStatus({
                "200": (r) => HttpClientResponse.schemaBodyJson(ListUserInventoryItems200)(r),
                orElse: (response) => unexpectedStatus(request, response)
              })
            ))
        )
      )
  }
}

export interface Discog {
  readonly httpClient: HttpClient.HttpClient
  readonly "getUserProfile": (
    username: string
  ) => Effect.Effect<typeof UserProfile.Type, HttpClientError.HttpClientError | ParseError>
  readonly "editUserProfile": (
    username: string,
    options: typeof EditUserProfileRequest.Encoded
  ) => Effect.Effect<typeof UserProfile.Type, HttpClientError.HttpClientError | ParseError>
  readonly "getUserSubmissions": (
    username: string,
    options?: typeof GetUserSubmissionsParams.Encoded | undefined
  ) => Effect.Effect<typeof GetUserSubmissions200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "getUserContributions": (
    username: string,
    options?: typeof GetUserContributionsParams.Encoded | undefined
  ) => Effect.Effect<typeof GetUserContributions200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "listUserCollectionFolders": (
    username: string
  ) => Effect.Effect<typeof ListUserCollectionFolders200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "createUserCollectionFolder": (
    username: string,
    options: typeof CreateUserCollectionFolderRequest.Encoded
  ) => Effect.Effect<typeof CollectionFolder.Type, HttpClientError.HttpClientError | ParseError>
  readonly "getUserCollectionFolderDetails": (
    username: string,
    folderId: string
  ) => Effect.Effect<typeof CollectionFolder.Type, HttpClientError.HttpClientError | ParseError>
  readonly "editUserCollectionFolder": (
    username: string,
    folderId: string,
    options: typeof EditUserCollectionFolderRequest.Encoded
  ) => Effect.Effect<typeof CollectionFolder.Type, HttpClientError.HttpClientError | ParseError>
  readonly "deleteUserCollectionFolder": (
    username: string,
    folderId: string
  ) => Effect.Effect<void, HttpClientError.HttpClientError | ParseError>
  readonly "listReleasesInUserCollectionFolder": (
    username: string,
    folderId: string,
    options?: typeof ListReleasesInUserCollectionFolderParams.Encoded | undefined
  ) => Effect.Effect<typeof ListReleasesInUserCollectionFolder200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "addReleaseToUserCollectionFolder": (
    username: string,
    folderId: string,
    options: typeof AddReleaseToUserCollectionFolderRequest.Encoded
  ) => Effect.Effect<typeof CollectionItem.Type, HttpClientError.HttpClientError | ParseError>
  readonly "getUserCollectionItemsByRelease": (
    username: string,
    releaseId: string,
    options?: typeof GetUserCollectionItemsByReleaseParams.Encoded | undefined
  ) => Effect.Effect<typeof GetUserCollectionItemsByRelease200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "editUserCollectionItemInstance": (
    username: string,
    folderId: string,
    releaseId: string,
    instanceId: string,
    options: typeof EditUserCollectionItemInstanceRequest.Encoded
  ) => Effect.Effect<typeof CollectionItem.Type, HttpClientError.HttpClientError | ParseError>
  readonly "deleteUserCollectionItemInstance": (
    username: string,
    folderId: string,
    releaseId: string,
    instanceId: string
  ) => Effect.Effect<void, HttpClientError.HttpClientError | ParseError>
  readonly "listUserCollectionCustomFields": (
    username: string
  ) => Effect.Effect<typeof ListUserCollectionCustomFields200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "getUserCollectionValue": (
    username: string
  ) => Effect.Effect<typeof CollectionValue.Type, HttpClientError.HttpClientError | ParseError>
  readonly "listUserWantlistItems": (
    username: string,
    options?: typeof ListUserWantlistItemsParams.Encoded | undefined
  ) => Effect.Effect<typeof ListUserWantlistItems200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "addReleaseToUserWantlist": (
    username: string,
    releaseId: string,
    options: typeof AddReleaseToUserWantlistRequest.Encoded
  ) => Effect.Effect<typeof WantItem.Type, HttpClientError.HttpClientError | ParseError>
  readonly "deleteReleaseFromUserWantlist": (
    username: string,
    releaseId: string
  ) => Effect.Effect<void, HttpClientError.HttpClientError | ParseError>
  readonly "listUserLists": (
    username: string,
    options?: typeof ListUserListsParams.Encoded | undefined
  ) => Effect.Effect<typeof ListUserLists200.Type, HttpClientError.HttpClientError | ParseError>
  readonly "listUserInventoryItems": (
    username: string,
    options?: typeof ListUserInventoryItemsParams.Encoded | undefined
  ) => Effect.Effect<typeof ListUserInventoryItems200.Type, HttpClientError.HttpClientError | ParseError>
}
