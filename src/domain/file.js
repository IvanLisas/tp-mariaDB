export class File {
  constructor(id, title, extension_type, publish_date, type) {
    this.id = id
    this.title = title
    this.extension_type = extension_type
    this.publish_date = publish_date
    this.type = type
  }

  icon = () => Error('Method \'say()\' must be implemented.')

  name = () => Error('Method \'say()\' must be implemented.')

  static fromJSON(fileJSON) {
    if (fileJSON.type === 'music') return Object.assign(new Music(), fileJSON)
    if (fileJSON.type === 'video') return Object.assign(new Video(), fileJSON)
    if (fileJSON.type === 'document') return Object.assign(new Document(), fileJSON)
  }

}

export class Music extends File {

  constructor(id, title, extension_type, publish_date, type) {
    super(id, title, extension_type, publish_date, type)
  }

  icon = () => <QueueMusicIcon />

  name = () => 'Musica'

  static fromJSON(musicJSON) { return Object.assign(new Music(), musicSON) }

}
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import DescriptionIcon from '@material-ui/icons/Description'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'

export class Video extends File {

  constructor(id, title, extension_type, publish_date, type) {
    super(id, title, extension_type, publish_date, type)
  }

  icon = () => <VideoLibraryIcon />

  name = () => 'Video'

  static fromJSON(videoJSON) { return Object.assign(new Video(), videoJSON) }
}

export class Document extends File {

  constructor(id, title, extension_type, publish_date, type) {
    super(id, title, extension_type, publish_date, type)
  }

  icon = () => <DescriptionIcon />

  name = () => 'Documento'

  static fromJSON(documentJSON) { return Object.assign(new Document(), documentJSON) }

}