namespace API.Resultados;


public class ResultadoUsuario : ResultadoBase{
    
    public List<ResultadoUsuarioItem> listaUsuarios { get; set;} = new List<ResultadoUsuarioItem>();

}

public class ResultadoUsuarioItem{
    public Guid R_id { get; set; } 
    public string R_nombreUsu { get; set; } 
    public string R_passwordUsu { get; set; } = null!;
    //public DateOnly R_fechaAlta { get; set; }
    public bool R_activo { get; set; } 
    public string R_nombreRol { get; set; } = null!;

     public Guid R_idRol { get; set; } 
}