export type GalleryFile = {
  directus_files_id: string
}
export type Gallery = {
  id: string
  name: string
  sort: number | null
  fotos: GalleryFile[]
}
