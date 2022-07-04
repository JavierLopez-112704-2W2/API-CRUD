namespace API.Resultados;


public class ResultadoSexos : ResultadoBase{
    
    public List<ResultadoSexoItem> listaSexos { get; set; } = new List<ResultadoSexoItem>();

}

public class ResultadoSexoItem{
    public Guid ResIdSexo { get; set; } 
    public string ResNombreSexo { get; set; } = null!;

}