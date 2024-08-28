using FluentValidation;
using staffmanagament.CORE.DTOs;

namespace staffmanagament.BUSINESS.Validations
{
    public class CreateUserDTOValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDTOValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username is required.");
            RuleFor(x => x.Email).EmailAddress().WithMessage("Valid email is required.");
        }
    }
}
