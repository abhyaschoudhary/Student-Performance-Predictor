from sqlalchemy import inspect

from app.core.database import engine


try:
    inspector = inspect(engine)

    tables = inspector.get_table_names()

    print("Database connection successful!")
    print("Tables found:")

    for table in tables:
        print("-", table)

except Exception as e:
    print("Database test failed!")
    print(e)