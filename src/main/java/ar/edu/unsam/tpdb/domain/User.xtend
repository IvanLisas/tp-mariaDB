package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors
import java.time.LocalDateTime

@Accessors
class User  {
	String name
	String username
	String surname
	int dni
	String email
	String password

}
