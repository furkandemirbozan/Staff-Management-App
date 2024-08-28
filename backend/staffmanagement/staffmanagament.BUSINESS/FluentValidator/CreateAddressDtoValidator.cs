﻿using FluentValidation;
using staffmanagament.CORE.DTOs;

namespace staffmanagament.BUSINESS.Validations
{
    public class CreateAddressDtoValidator : AbstractValidator<CreateAddressDto>
    {
        public CreateAddressDtoValidator()
        {
            RuleFor(x => x.StreetAddress).NotEmpty().WithMessage("Street Address is required.");
            RuleFor(x => x.PostalCode).NotEmpty().WithMessage("Postal Code is required.");
            RuleFor(x => x.City).NotEmpty().WithMessage("City is required.");
            RuleFor(x => x.Country).NotEmpty().WithMessage("Country is required.");
        }
    }
}
