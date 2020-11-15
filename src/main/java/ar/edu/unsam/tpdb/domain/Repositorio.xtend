package ar.edu.unsam.tpdb.domain

import java.util.ArrayList
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Repositorio<T extends Almacenable> {
	
	List<T> objetos = new ArrayList
	int ultimoID = 0
	
	//MULTITONES
	@Accessors(PUBLIC_GETTER) public static Repositorio<User> users = new Repositorio<User>

	//SE HACE PRIVADO PARA QUE NO SE PUEDA CREAR
	private new(){
	}

	
	// AGREGA UN OBJETO AL REPOSITORIO Y LE ASIGNA UN NUMERO DE ID 
	def create(T object) {
		object.id = ultimoID + 1
		objetos.add(object)
		ultimoID = ultimoID + 1
	}

	//VACIA LA LISTA DE OBJETOS EN EL REPO
	def vaciar(){ objetos.clear }
	
	// ELIMINA UN OBJETO DEL REPOSITORIO
	def delete(T object) { objetos.remove(object) }

	// ACTUALIZA LOS DATOS DE UN OBJETO QUE ESTÁ EN EL REPOSITORIO 
	def update(T object) {
		
		//GUARDO LA POSICIÓN DEL OBJETO EN LA LISTA
		val posicionObjeto = objetos.indexOf(getById(object.id))
		
		//MIENTRAS EXISTA UNA POSICIÓN, SE PUEDE ACTUALIZAR 
		if (posicionObjeto == -1) throw new Exception("El objeto no existe en el repositorio")
		else objetos.set(posicionObjeto, object)
	}

	// BUSCA Y DEVUELVE EL OBJETO QUE TENGA EL MISMO NUMERO DE ID
	def getById(int id) { objetos.findFirst[id == it.id] }

	// BUSCA Y DEVUELVE LOS OBJETOS QUE CUMPLAN CON LA CONDICION DE BUSQUEDA
	def search(String value) { objetos.filter[condicionDeBusqueda(value)].toList }
	
 
 	
}

//SE CREA UNA CLASE ABSTRACTA QUE LA HEREDAN ALIMENTO, RECETA Y USUARIO
@Accessors
abstract class Almacenable {
	int id = 0

	abstract def boolean condicionDeBusqueda(String value)
}

