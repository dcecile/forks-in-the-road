# frozen_string_literal: true

fruit = Comparison.seed(
  id: 1,
  name: "Best fruit",
  alternative_noun: "fruit",
  value_unit: "util"
)
apple = Alternative.seed(
  id: 1,
  comparison_id: fruit[0].id,
  name: "Apple",
  url: "https://en.wikipedia.org/wiki/Apple"
)
Alternative.seed(
  id: 2,
  comparison_id: fruit[0].id,
  name: "Orange"
)
taste = Criterion.seed(
  id: 1,
  comparison_id: fruit[0].id,
  name: "Taste",
  description: "Gastronomic sense of happiness",
  full_value: 5,
  default_estimate: 0.6
)
convenience = Criterion.seed(
  id: 2,
  comparison_id: fruit[0].id,
  name: "Convenience",
  description: "Ease of consumption",
  full_value: 3,
  default_estimate: 0.8
)
Estimate.seed(
  id: 1,
  alternative_id: apple[0].id,
  criterion_id: taste[0].id,
  estimate: 0.7
)
Estimate.seed(
  id: 2,
  alternative_id: apple[0].id,
  criterion_id: convenience[0].id,
  estimate: 0.9
)
