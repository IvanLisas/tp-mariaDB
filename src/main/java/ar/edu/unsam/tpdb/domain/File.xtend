package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class File {
	int id
	String title
	String extension_type
	String type
	LocalDateTime publish_date

}
