package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors
import java.util.HashMap

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