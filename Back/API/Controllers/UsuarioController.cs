using System.Data;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Models;
using API.Resultados;
using API.Comandos;

namespace API.Controllers;

[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly Prog31105Context _context;

    public UsuarioController(Prog31105Context context)
   	{
        _context = context;
   	}

    //---------------------------------------------------------------------------------------
    [HttpPost]
    [Route("/api/usuario/login")]
    public async Task<ActionResult<ResultadoLogin>> Login([FromBody] ComandoLogin comando){
        try{
            var resultado = new ResultadoLogin();
            var usuario = await _context.Usuarios.Where(c => 
                c.Activo && 
                c.NombreUsuario.Equals(comando.CnombreUsu) && 
                c.Password.Equals(comando.CpasswordUsu)
            ).Include(c => c.IdRolNavigation).FirstOrDefaultAsync();

            if(usuario != null){
                resultado.RnombreUsu = usuario.NombreUsuario;
                resultado.RnombreRol = usuario.IdRolNavigation.Nombre;
                resultado.StatusCode = "200";

                return Ok(resultado);
            }
            else
            {
                resultado.SetError("Usuario no encontrado en BD"); //falsea el Ok
                resultado.StatusCode = "500";
                return Ok(resultado);
            }

        }catch(Exception ex){
            return BadRequest("Error al obtener Usuario");
        }
    }
    //---------------------------------------------------------------------------------------
    [HttpGet]
    [Route("/api/usuario/GetUsuarios")]
    public async Task<ActionResult<ResultadoUsuario>> GetTodosLosActivos(){
        try{
            var resultado = new ResultadoUsuario();

            var usuarios = await _context.Usuarios.Where(x => x.Activo).Include(c => c.IdRolNavigation).ToListAsync();

            if (usuarios != null)
            {
                foreach (var item in usuarios){                  
                    var resUsuAux = new ResultadoUsuarioItem(){
                        
                        R_id = item.Id,
                        R_nombreRol = item.IdRolNavigation.Nombre,
                        R_nombreUsu = item.NombreUsuario,
                        R_passwordUsu = item.Password,
                        //R_fechaAlta = item.FechaAlta,
                        R_activo = item.Activo,
                        
                    };
                    resultado.listaUsuarios.Add(resUsuAux);
                }
                resultado.StatusCode = "200";
                return Ok(resultado);
            }
            else
            {
                resultado.SetError("Usuarios no encontrados en BD"); 
                resultado.StatusCode = "500";
                return Ok(resultado);
            }
        }
        catch (Exception ex)
        {
            return BadRequest("Error al obtener Usuarios");
        }
    }
    //---------------------------------------------------------------------------------------------------------
    [HttpGet]
    [Route("/api/usuario/GetRoles")]
    public async Task<ActionResult<ResultadoRoles>> GetRoles(){

        var roles = await _context.Roles.ToListAsync();
        var resultado = new ResultadoRoles();
        foreach (var item in roles){
            var resu = new ResultadoRolItem(){
                ResIdRol = item.Id,
                ResNombreRol = item.Nombre
            };
            resultado.listaRoles.Add(resu);
        }

        return resultado;
    }
    //---------------------------------------------------------------------------------------------------------
    [HttpPost]//FirstOrDefault(c => c.Nombre.Equals("Javier") && c.Apellido.Contains("L"));
    [Route("/api/usuario/create")]
    public async Task<ActionResult<ResultadoUsuario>> CreateUsuario([FromBody] ComandoUsuario comando){
        try{
            var tipo = await _context.Roles.FirstOrDefaultAsync(c => c.Nombre.Equals(comando.CtipoUsuario));
            var resultado = new ResultadoUsuario();
            
            var usuario = new Usuario
            {
                Id = Guid.NewGuid(), 
                Activo = true,
                FechaAlta = DateOnly.FromDateTime(DateTime.Now),
                //FechaAlta = DateOnly.Parse("2022-05-11"),
                IdRol = tipo.Id,
                NombreUsuario = comando.CnombreUsu,
                Password = comando.CpasswordUsu
            };
            await _context.AddAsync(usuario);
            await _context.SaveChangesAsync();

            resultado.StatusCode="200";

            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return BadRequest("Error al crear Usuario");
        }
    }
    //---------------------------------------------------------------------------------------------------------
    [HttpDelete]
    [Route("/api/usuario/delete")]
    public async Task<ActionResult<bool>> Delete([FromBody] ComandoUsuario comando)
    {
        var usuario = await _context.Usuarios.Where(x => x.NombreUsuario == comando.CnombreUsu).FirstOrDefaultAsync(); ;

        if (usuario == null)
        {
            return NotFound("no se encontró");
        }

        _context.Remove(usuario); //RemoveAsync()
        await _context.SaveChangesAsync();

        return Ok(true);

    }
    //---------------------------------------------------------------------------------------------------------




}
