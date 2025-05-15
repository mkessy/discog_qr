import { FetchHttpClient, FileSystem, HttpClient, HttpClientRequest } from "@effect/platform"
import { BunFileSystem } from "@effect/platform-bun"
import { Effect } from "effect"

import * as Generated from "./discog/Generated.js"

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem
  const httpClient = (yield* HttpClient.HttpClient).pipe(
    HttpClient.mapRequest(
      (request) =>
        request.pipe(
          HttpClientRequest.prependUrl("https://api.discogs.com")
        )
    )
  )

  const discogClient = Generated.make(httpClient)

  const result = yield* discogClient.listReleasesInUserCollectionFolder(
    "mepuka",
    "0",
    {
      per_page: 100
    }
  )

  yield* fs.writeFile("releases.json", new TextEncoder().encode(JSON.stringify(result.releases, null, 2)))
}).pipe(Effect.provide(FetchHttpClient.layer), Effect.provide(BunFileSystem.layer))

program.pipe(Effect.runPromise)
