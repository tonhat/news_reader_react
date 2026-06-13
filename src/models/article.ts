export interface Article {
  title: string
  description: string | null
  content: string | null
  urlToImage: string | null
  url: string | null
  source: string | null
  publishedAt: string | null
}

export function articleFromJson(json: Record<string, unknown>): Article {
  return {
    title: (json['title'] as string) ?? '',
    description: (json['description'] as string) ?? null,
    content: (json['content'] as string) ?? null,
    urlToImage: (json['urlToImage'] as string) ?? null,
    url: (json['url'] as string) ?? null,
    source:
      json['source'] && typeof json['source'] === 'object'
        ? ((json['source'] as Record<string, unknown>)['name'] as string) ?? null
        : (json['source'] as string) ?? null,
    publishedAt: (json['publishedAt'] as string) ?? null,
  }
}
