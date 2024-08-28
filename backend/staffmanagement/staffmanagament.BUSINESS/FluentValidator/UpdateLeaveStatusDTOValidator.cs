using FluentValidation;
using staffmanagament.CORE.DTOs;

namespace staffmanagament.BUSINESS.Validations
{
    public class UpdateLeaveStatusDTOValidator : AbstractValidator<UpdateLeaveStatusDto>
    {
        public UpdateLeaveStatusDTOValidator()
        {
            RuleFor(x => x.RequestStatusId).GreaterThan(0).WithMessage("Request Status Id is required.");
        }
    }
}
