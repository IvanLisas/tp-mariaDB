package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors

class Reproduction {
	int id	 
	String os
	Action action
	File file
	int user_id
}
