namespace API.Resultados;

public class ResultadoPersona : ResultadoBase{

    public List<ResultadoPersonaItem> listaPersonas { get; set;} = new List<ResultadoPersonaItem>();

}

//otra clase en el mismo archivo

public class ResultadoPersonaItem{ 
    public Guid R_Id { get; set; }
    public string R_Nombre { get; set; } = null!;
    public string R_Apellido { get; set; } = null!;
    public string R_Dni { get; set; } = null!;
    public string R_Sexo { get; set; } = null!;
}
