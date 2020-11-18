package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Download {
	int id
	double speed
	
	Accion accion
	File file
	User user
	
}