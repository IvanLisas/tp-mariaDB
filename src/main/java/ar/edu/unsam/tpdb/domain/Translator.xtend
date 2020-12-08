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
		spanishTranslate.put("January", "Ene");
		spanishTranslate.put("February", "Feb");
		spanishTranslate.put("March", "Mar");
		spanishTranslate.put("April", "Abr");
		spanishTranslate.put("May", "May");
		spanishTranslate.put("June", "Jun");
		spanishTranslate.put("July", "Jul");
		spanishTranslate.put("August", "Ago");
		spanishTranslate.put("September", "Sep");
		spanishTranslate.put("October", "Oct");
		spanishTranslate.put("November", "Nov");
		spanishTranslate.put("December", "Dic");
		
		spanishTranslate.get(month)
	}
}