# Exam trainer

simple exam trainer. Questions should be created as questions.json within the questions directory.

Answers will be the indexes of the options, starting with 0, as strings.

JSON Format:

```
{
    "title": string,
    "questions":[
        {
            "question": string,
            "options": string[],
            "answers": string[]
        },
    ]
}
```

## Example questions.json

```
{
    "title": "Baking 101",
    "questions": [
        {
            "question": "What don't you need for pancakes?",
            "options": ["baking powder", "salt", "sugar", "orange juice", "eggs", "yeast"],
            "answers": ["3", "5"]
        }
    ]
}
```
