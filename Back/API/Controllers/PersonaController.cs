using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Models;
using API.Resultados;
using API.Comandos;

namespace API.Controllers;

[ApiController]
public class PersonaController: ControllerBase{

    private readonly Prog31105Context _context;

    public PersonaController(Prog31105Context context)
    {
        _context = context;
    }
    //---------------------------------------------------------------------------------------------------------
    [HttpGet]
    [Route("/api/persona/GetPersonas")]
    public async Task<ActionResult<ResultadoPersona>> GetPersonas(){

        var resultado = new ResultadoPersona();

        var personas = await _context.Personas.Include(c=>c.IdSexoNavigation).ToListAsync();

        if(personas != null){
            foreach(var item in personas){
                var pers = new ResultadoPersonaItem{
                    R_Id = item.Id,
                    R_Nombre = item.Nombre,
                    R_Apellido = item.Apellido,
                    R_Dni = item.Dni,
                    R_Sexo = item.IdSexoNavigation.Nombre                   
                };

                resultado.listaPersonas.Add(pers);
                resultado.StatusCode = "200";

            }
            return Ok(resultado);
                      
        }
        else return BadRequest(resultado);
    }

    //---------------------------------------------------------------------------------------------------------
    [HttpPut]
    [Route("/api/persona/UpdatePersona")]
    public async Task<ActionResult<ResultadoBase>> UpdatePersona([FromBody] ComandoPersona comando){
        
        

        var resultado = new ResultadoBase();

        
        if(comando.C_Nombre.Equals("")){
            resultado.SetError("No se puede editar dicha persona");
            resultado.StatusCode = "400";
        }

        var sexo = await _context.Sexos.Where(x => x.Nombre.Equals(comando.C_NombreSexo)).FirstOrDefaultAsync();
        var persona = await _context.Personas.Where(c => c.Id.Equals(comando.C_Id)).FirstOrDefaultAsync();
        
        if(persona != null) {
            persona.Dni = comando.C_Dni;
            persona.Nombre = comando.C_Nombre;
            persona.Apellido = comando.C_Apellido;
            persona.IdSexo = sexo.Id;

            _context.Update(persona);
            await _context.SaveChangesAsync();

            resultado.StatusCode = "200"; 

        }
        else{
            resultado.SetError("No se encuentra persona");
            resultado.StatusCode = "500";

        }

        return resultado;
    }

    //---------------------------------------------------------------------------------------------------------
    [HttpGet]
    [Route("/api/persona/GetPersona/{idPersona}")]  //hacere front para pasar id por url
    public async Task<ActionResult<ResultadoPersonaU>> GetPersonaById(Guid idPersona){

        var persona = await _context.Personas.Where(c=>c.Id.Equals(idPersona)).FirstOrDefaultAsync();

        var resultado = new ResultadoPersonaU();

        if (persona != null){
            resultado.R_Nombre = persona.Nombre;
            resultado.R_Apellido = persona.Apellido;
            resultado.R_Dni = persona.Dni;

            resultado.StatusCode = "200";
            
        }
        else{
            resultado.SetError("No se encuentra persona");
            resultado.StatusCode = "500";
        }

        return resultado;
    }

    //---------------------------------------------------------------------------------------------------------
    [HttpGet]
    [Route("/api/persona/GetSexos")]
    public async Task<ActionResult<ResultadoSexos>> GetSexos(){

        var sexos = await _context.Sexos.ToListAsync();
        var resultado = new ResultadoSexos();
        foreach (var item in sexos){
            var resu = new ResultadoSexoItem(){
                ResIdSexo = item.Id,
                ResNombreSexo = item.Nombre
            };
            resultado.listaSexos.Add(resu);
        }

        return resultado;
    }
    //---------------------------------------------------------------------------------------------------------
    [HttpDelete]
    [Route("/api/persona/delete/{idPersona}")]
    public async Task<ActionResult<bool>> Delete(Guid idPersona)
    {
        var persona = await _context.Personas.Where(x => x.Id == idPersona).FirstOrDefaultAsync(); ;

        if (persona == null)
        {
            return NotFound("no se encontró");
        }

        _context.Remove(persona);
        await _context.SaveChangesAsync();

        return Ok(true);

    }
    //---------------------------------------------------------------------------------------------------------
    [HttpPost]
    [Route("/api/persona/create")]
    public async Task<ActionResult<ResultadoPersona>> CreateUsuario([FromBody] ComandoPersona comando){
        try{
            
            var sexo = await _context.Sexos.FirstOrDefaultAsync(c => c.Nombre.Equals(comando.C_NombreSexo));
            var resultado = new ResultadoPersona();

            
            var persona = new Persona{
                Id = Guid.NewGuid(), 
                Nombre = comando.C_Nombre,
                Apellido = comando.C_Apellido,
                Dni = comando.C_Dni,
                IdSexo = sexo.Id,
                Calle = comando.C_Calle,
                Numero = comando.C_Numero
            };
            await _context.AddAsync(persona);
            await _context.SaveChangesAsync();

            resultado.StatusCode="200";

            return Ok(resultado);
        }
        catch (Exception ex)
        {

            return BadRequest("Error al crear Persona");
        }
    }
    //---------------------------------------------------------------------------------------------------------


}