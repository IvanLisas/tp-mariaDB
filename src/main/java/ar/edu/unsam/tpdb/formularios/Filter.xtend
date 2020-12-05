package ar.edu.unsam.tpdb.formularios

import java.sql.ResultSet
import java.util.ArrayList
import java.util.HashMap
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class FilterOrden{
	List<Filtro> filtros
	Orden orden
}

@Accessors
class Filtro {
	String filtro
	String keyword
}

@Accessors
class Orden{
	String column
	String orden
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

@Accessors
class ReproductionCount {
	String month
	int count

	def factory(ResultSet reproductionResult) {
		var List<ReproductionCount> reproductionCount = new ArrayList()

		while (reproductionResult.next) {
			reproductionCount.add(new ReproductionCount() => [
				month =  Translator.get.translator(reproductionResult.getString("MONTH"))
				count = reproductionResult.getInt("COUNT")
			])
		}
		reproductionCount
	}
}

@Accessors
class Translator {

	static HashMap<String, String> spanishTranslate = new HashMap<String, String>()

	private new() {
	}

	public static Translator get = new Translator

	def translator(String month) {
		

		spanishTranslate.put("January", "Enero");
		spanishTranslate.put("February", "Febrero");
		spanishTranslate.put("March", "Marzo");
		spanishTranslate.put("April", "Abril");
		spanishTranslate.put("May", "Mayo");
		spanishTranslate.put("June", "Junio");
		spanishTranslate.put("July", "Julio");
		spanishTranslate.put("August", "Agosto");
		spanishTranslate.put("September", "Septiembre");
		spanishTranslate.put("October", "Octubre");
		spanishTranslate.put("November", "Noviembre");
		spanishTranslate.put("December", "Diciembre");
		
		spanishTranslate.get(month)
	}
}
