import pandas as pd
import mysql.connector
import xgboost as xgb
import joblib
import os
import sys
from sklearn.preprocessing import MultiLabelBinarizer, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# ==============================
# 1. Load data from MySQL view
# ==============================
def load_data():
    conn = mysql.connector.connect(
        host="localhost",      # ⚡ DB host
        user="root",           # ⚡ DB username
        password="",           # ⚡ DB password
        database="pikrus_db"   # ⚡ Your Laravel DB
    )

    query = "SELECT * FROM v_knowledgebases"
    df = pd.read_sql(query, conn)
    conn.close()

    # 🚨 Check if empty
    if df.empty:
        print("❌ ERROR: v_knowledgebases is empty! Cannot continue.")
        sys.exit(1)

    # 🚨 Ensure required columns
    required_cols = {"disease", "symptoms", "priorillnesses"}
    missing = required_cols - set(df.columns)
    if missing:
        print(f"❌ ERROR: Missing required columns: {missing}")
        sys.exit(1)

    # ✅ Normalize text → lists
    df['symptom_list'] = df['symptoms'].fillna("").apply(
        lambda x: [s.strip() for s in x.split(",") if s.strip()]
    )
    df['prior_list'] = df['priorillnesses'].fillna("").apply(
        lambda x: [p.strip() for p in x.split(",") if p.strip()]
    )

    # ✅ Combined features
    df['features'] = df['symptom_list'] + df['prior_list']

    if df['features'].apply(len).sum() == 0:
        print("❌ ERROR: No usable symptoms/prior illnesses in dataset.")
        sys.exit(1)

    print(f"⚡ Data loaded: {len(df)} rows with normalized features")
    return df

# ==============================
# 2. Preprocess
# ==============================
def preprocess(df):
    mlb = MultiLabelBinarizer()
    X = mlb.fit_transform(df['features'])

    le = LabelEncoder()
    y = le.fit_transform(df['disease'])

    print(f"🔧 Encoded {len(mlb.classes_)} unique features and {len(le.classes_)} diseases")
    return X, y, mlb, le

# ==============================
# 3. Train
# ==============================
def train(X, y, df):
    # more stable params for small datasets
    model = xgb.XGBClassifier(
        eval_metric="mlogloss",
        use_label_encoder=False,
        n_estimators=200,
        max_depth=6,
        learning_rate=0.1,
        random_state=42
    )

    if len(df) < 10:
        # Not enough rows → train on all
        model.fit(X, y)
        acc = accuracy_score(y, model.predict(X))
    else:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        model.fit(X_train, y_train)
        acc = accuracy_score(y_test, model.predict(X_test))

    print(f"✅ Training complete. Accuracy: {acc:.2f}")
    return model

# ==============================
# 4. Save model + encoders
# ==============================
def save(model, mlb, le):
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/disease_predictor.joblib")
    joblib.dump(le, "models/label_encoder.joblib")
    joblib.dump(mlb, "models/feature_encoder.joblib")

    with open("models/disease_labels.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(list(le.classes_)))

    print(f"💾 Saved model + {len(le.classes_)} disease labels to /models")

# ==============================
# 5. Run training
# ==============================
if __name__ == "__main__":
    df = load_data()
    X, y, mlb, le = preprocess(df)
    model = train(X, y, df)
    save(model, mlb, le)
