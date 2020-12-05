package ar.edu.unsam.tpdb.domain

import com.google.common.hash.Hashing
import java.nio.charset.StandardCharsets

class Encriptar {

	def encriptarContenido(String password) {
		if (password !== null) {
			val sha256hex = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString()
			println(sha256hex)
			return sha256hex
		}
		null
	}
}