using System;
using System.Collections.Generic;

namespace API.Models
{
    public partial class Deporte
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; } = null!;
        public Guid IdTipoDeporte { get; set; }
        public string Descripcion { get; set; } = null!;

        public virtual TipoDeporte IdTipoDeporteNavigation { get; set; } = null!;
    }
}
