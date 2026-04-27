# Hello World: Why I Started Writing

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## The problem with pipelines

Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.

Here's what a typical pipeline config looks like:

```python
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("risk-etl") \
    .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions") \
    .getOrCreate()

df = spark.read.format("iceberg").load("catalog.risk.transactions")
df_clean = df.filter(df.amount > 0).dropDuplicates(["txn_id"])
```

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.

## Why AI changes the ceiling

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.

> Data engineering is the foundation, but the ceiling is higher now. AI doesn't replace the engineer; it changes what one engineer can reach.

Et harum quidem rerum facilis est et expedita distinctio.

## What I'll write about

- Building data pipelines at scale with PySpark and Iceberg
- The AI-Augmented Engineer concept and what it means in practice
- Open-source datasets and why they matter for the Vietnamese tech community
- Lessons from rotating across four teams in 18 months at Techcombank

---

That's the first transmission. More to come.
