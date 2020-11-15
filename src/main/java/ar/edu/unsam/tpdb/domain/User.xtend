package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class User extends Almacenable {
	String username = ""
	
	override condicionDeBusqueda(String value) {
		true
	}
	
}

@Accessors
class Test {
	String value = "test.value"
}

	