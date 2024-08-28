using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace staffmanagament.CORE.Models
{
    public class EducationLevel
    {
        public int Id { get; set; }
        public string Name { get; set; }


        // Navigation properties
        public ICollection<Employee> Employees { get; set; }
    }
}
