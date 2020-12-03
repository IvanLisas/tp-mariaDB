package ar.edu.unsam.tpdb.formularios

import java.util.ArrayList;
import ar.edu.unsam.tpdb.domain.User
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import com.google.common.hash.Hashing
import java.nio.charset.StandardCharsets

class Encriptar {
 
	def encriptarContenido(String password) {
		val sha256hex = Hashing.sha256().hashString
		(password, StandardCharsets.UTF_8).toString()
		println(sha256hex)
		sha256hex
	}
	

}
