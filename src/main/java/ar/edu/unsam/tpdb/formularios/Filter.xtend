package ar.edu.unsam.tpdb.formularios

import java.util.List
import java.lang.reflect.Array
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Filtro {
	String filtro
	String keyword
}

class Filter {

	def byAscFileName() { ' ORDER BY file.title ASC' }

	def byDesFileName() { ' ORDER BY file.title DESC' }

	def byFileName(String filtro, String keyword) {
		' and ' + filtro + ' like "%' + keyword + '%"'
	}

	def create(List<Filtro> filtros) {
		val resultado = filtros.map[byFileName(it.filtro, it.keyword)]
		val str = String.join("", resultado);
		str
	}
}
