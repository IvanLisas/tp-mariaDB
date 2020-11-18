package ar.edu.unsam.tpdb.domain

import java.time.LocalDateTime
import org.eclipse.xtend.lib.annotations.Accessors
import java.util.List
import java.util.ArrayList

@Accessors
class File {
	int id
	String title
	String extension_type
	String type
	String publish_date
   
   List<String> categories = new ArrayList()
   
}
