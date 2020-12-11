package ar.edu.unsam.tpdb.formularios

import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class FilterOrden{
	List<Filtro> filtros
	Orden orden
	int limit
	int offset
	
	def byFileName(String filtro, String keyword) {
		' and ' + filtro + ' like "%' + keyword + '%"'
	}

	def create() {
		val resultado = filtros.map[byFileName(it.filtro, it.keyword)]
		val str = String.join("", resultado);
		str
	}
}

@Accessors
class Filtro {
	String filtro
	String keyword
}

@Accessors
class Orden{
	String column
	String direction
}