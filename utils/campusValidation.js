export default function validateCampus(campus) {
  return campus.name.length > 0 && campus.name.length <= 50;
}
