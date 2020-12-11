import VideoCard from '../components/inicio/extras/videoCard'
import MusicCard from '../components/inicio/extras/musicCard'
import CommentCard from '../components/inicio/extras/commentCard'
import ComplexCard from '../components/inicio/extras/complexCard'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import DescriptionIcon from '@material-ui/icons/Description'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
export class File {
  constructor(id, title, extension_type, publish_date, type, thumbnail) {
    this.id = id
    this.title = title
    this.extension_type = extension_type
    this.publish_date = publish_date
    this.type = type
    this.thumbnail = thumbnail
  }

  icon = () => Error('Method \'say()\' must be implemented.')

  name = () => Error('Method \'say()\' must be implemented.')

  static fromJSON(fileJSON) {
    if (fileJSON.type === 'music') return Object.assign(new Music(), fileJSON)
    if (fileJSON.type === 'video') return Object.assign(new Video(), fileJSON)
    if (fileJSON.type === 'document') return Object.assign(new Document(), fileJSON)
  }

  date_init_format = () => {
    var chunks = this.publish_date.split(' ')
    var chunks2 = chunks[0].split('-')
    return chunks2[2] + '/' + chunks2[1] + '/' + chunks2[0]
  }

}

export class Music extends File {

  constructor(id, title, extension_type, publish_date, type) {
    super(id, title, extension_type, publish_date, type)
  }

  icon = () => <QueueMusicIcon />

  name = () => 'Musica'

  static fromJSON(musicJSON) { return Object.assign(new Music(), musicJSON) }

  get card() {
    return <MusicCard
      banda={this.title}
      autor={this.autor}
      thumbnail={this.thumbnail}
      id={this.id}
    />
  }
}


export class Video extends File {

  constructor(id, title, extension_type, publish_date, type) {
    super(id, title, extension_type, publish_date, type)
  }

  icon = () => <VideoLibraryIcon />

  name = () => 'Video'

  static fromJSON(videoJSON) { return Object.assign(new Video(), videoJSON) }

  get card() {
    return <VideoCard
      autor={this.autor}
      titulo={this.title}
      thumbnail={this.thumbnail}
    />
  }
}

export class Document extends File {

  constructor(id, title, extension_type, publish_date, type) {
    super(id, title, extension_type, publish_date, type)
  }

  icon = () => <DescriptionIcon />

  name = () => 'Documento'

  static fromJSON(documentJSON) { return Object.assign(new Document(), documentJSON) }

  get card() {
    return <ComplexCard
      encabezado={this.name()}
      titulo={this.title}
      thumbnail={this.thumbnail}
      autor={this.autor}
      extension={this.extension_type}
      fecha={this.date_init_format()}
      categories={this.categories}
    />
  }

}