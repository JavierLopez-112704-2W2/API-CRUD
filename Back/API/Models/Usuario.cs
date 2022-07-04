using System;
using System.Collections.Generic;

namespace API.Models
{
    public partial class Usuario
    {
        public Guid Id { get; set; }
        public string NombreUsuario { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateOnly FechaAlta { get; set; }
        public bool Activo { get; set; }
        public Guid IdRol { get; set; }

        public virtual Role IdRolNavigation { get; set; } = null!;
    }
}
