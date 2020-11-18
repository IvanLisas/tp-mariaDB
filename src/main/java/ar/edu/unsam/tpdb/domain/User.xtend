package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors
import java.time.LocalDateTime
import java.util.List

@Accessors
class User  {
	int id
	String name
	String username
	String surname
	int dni
	String email
	String password
	String date
	List <Download> downloads 
		List <Reproduction> reproductions  
}
