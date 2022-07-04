namespace API.Resultados;


public class ResultadoRoles : ResultadoBase{
    
    public List<ResultadoRolItem> listaRoles { get; set;} = new List<ResultadoRolItem>();

}

public class ResultadoRolItem{
    public Guid ResIdRol { get; set; } 
    public string ResNombreRol { get; set; } = null!;

}